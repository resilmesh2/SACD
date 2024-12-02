// @ts-nocheck

import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, throwError } from 'rxjs';
import gql from 'graphql-tag';
import { Node, Edge } from '@swimlane/ngx-graph';
import _ from 'lodash';
import { map } from 'rxjs/operators';
import { DocumentNode } from 'graphql';
import { GraphInput } from '../models/graph.model';
import { entities } from '../config/network-visualization.config';
import { Attributes } from '../config/attributes';
import { CVE } from '../models/vulnerability.model';
import { Mission } from '../models/mission.model';
import { MissionStructure } from '../models/mission-structure.model';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';


@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private apollo: Apollo) {}

  /**
   * Get IP node from database based on IP address
   * @param ip
   */
  public getIPNode(ip: string): Observable<GraphInput> {
    return this.apollo
      .query<any>({
        query: gql`
        {
          IP(address: "${ip}") {
            ${this.getAttributesOfType('IP')}
          }
        }
      `,
      })
      .pipe(
        map((data) => {
          const { nodes, edges } = this.converToGraph(data.data.IP);
          return { nodes, edges };
        })
      );
  }

  /**
   * Gets neighbours of given node
   * @param node
   */
  public getNodeNeighbours(node: Node): Observable<GraphInput> {
    console.log(node, JSON.stringify(node));
    return this.apollo
      .query<any>({
        query: gql`
        {
          ${node.data.type}(_id: "${node.id}") {
            ${this.getAttributesOfType(node.data.type)}
          }
        }
      `,
      })
      .pipe(
        map((data) => {
          const { nodes, edges } = this.converToGraph(data.data[node.data.type]);
          return { nodes, edges };
        })
      );
  }

  getAttributesOfType(type: any): string {
    return Attributes[type].toString();
  }

  /**
   * Converts graph data to ngx-graph compliant format
   * @param data
   * @param parent
   * @param edgeName
   */
  public converToGraph(data: any[], parent?: string, edgeName?: string): GraphInput {
    let nodes: Node[] = [];
    let edges: Edge[] = [];

    data.forEach((item) => {
      if (nodes.findIndex((n) => n.id === item._id) === -1) {
        nodes.push({
          id: item._id,
          label: this.getLabel(item),
          data: {
            customColor: this.getColor(item),
            type: item.__typename,
            labelName: this.getLabelName(item),
            ...this.clearAttributes(item),
          },
        });
      }

      if (parent) {
        edges.push({ source: parent, target: item._id, label: edgeName });
      }

      Object.keys(item).forEach((key) => {
        if (Array.isArray(item[key]) && item[key].length > 0 && item[key][0].__typename) {
          const { nodes: newNodes, edges: newEdges } = this.converToGraph(item[key], item._id, key);
          nodes = _.unionBy(nodes, newNodes, (n) => n.id);
          edges = _.unionBy(edges, newEdges, (e) => [e.source, e.target, e.label]);
        }
      });
    });

    return { nodes, edges };
  }


  /**
   * Gets label of given node based on static config
   * @param node
   */
  public getLabel(node: any): string {
    const initialLabel = node.__typename;
    if (typeof entities[initialLabel] === 'undefined') {
      return initialLabel;
    }
    if (entities[initialLabel].showProperty.length === 0) {
      return initialLabel;
    }
    const propKey = entities[initialLabel].showProperty.find(
      (pk) => typeof node[pk] !== 'undefined' && node[pk] !== null
    );
    if (typeof node[propKey] === 'undefined') {
      return initialLabel;
    }
    return node[propKey].toString();
  }

  /**
   * Gets label name of given node (eg. DomainName, IP)
   * @param node
   */
  public getLabelName(node: any): string {
    const initialLabel = node.__typename;
    if (typeof entities[initialLabel] === 'undefined') {
      return initialLabel;
    }
    if (entities[initialLabel].showProperty.length === 0) {
      return initialLabel;
    }
    const propKey = entities[initialLabel].showProperty.find(
      (pk) => typeof node[pk] !== 'undefined' && node[pk] !== null
    );
    if (typeof node[propKey] === 'undefined') {
      return initialLabel;
    }
    return propKey;
  }

  /**
   * Return color that should be assigned to given node
   * @param node
   */
  private getColor(node: any): string {
    const initialLabel = node.__typename;
    return entities[initialLabel]?.bgColor || 'red';
  }

  /**
   * Clears unneccessery attributes of item
   * @param item
   */
  private clearAttributes(item: any) {
    const clonedItem = { ...item };
    delete clonedItem._id;
    delete clonedItem.__typename;
    return clonedItem;
  }

  /**
   * Returns label of ngx-graph node based on static config
   * @param node
   */
  public getLabelOfGraphNode(node: Node) {
    const initialLabel = node.data.type;
    if (typeof entities[initialLabel] === 'undefined') {
      return initialLabel;
    }
    if (entities[initialLabel].showProperty.length === 0) {
      return initialLabel;
    }
    const propKey = entities[initialLabel].showProperty.find(
      (pk) => typeof node.data[pk] !== 'undefined' && node.data[pk] !== null
    );
    if (typeof node.data[propKey] === 'undefined') {
      return initialLabel;
    }
    return node.data[propKey].toString();
  }

  /**
   * Gets names of all available missions
   */
  public getMissionNames(): Observable<string[]> {
    return this.apollo // Assuming 'this' has an Apollo instance
      .query<any>({
        query: gql`
          {
            Mission {
              name
            }
          }
        `,
      })
      .pipe(
        map((data) => {
          const missions = data.data.Mission.map((mission: any) => mission.name);
          return missions;
        })
      );
  }

  /**
   * Gets mission object by its name
   * @param name name of the mission
   */
  public getMission(name: String): Observable<Mission[]> {
    return this.apollo // Assuming 'this' has an Apollo instance
    .query<any>({
      query: gql`
        {
          Mission(name: "${name}") {
            name,
            criticality,
            description,
            structure,
          }
        }
      `,
    })
    .pipe(
      map((response) => {
        const missions: Mission[] = response.data.Mission
        return missions;
      })
    );
  }

  /**
   * Gets structure parameter from each mission and merges them into one structure
   * @param missions list of missions
   *
   */
  public makeMissionsStructure(missions: Mission[]): MissionStructure {
    let result: MissionStructure;
    let structure: MissionStructure;

    result = missions.reduce(
      (acc, mission) => {
        structure = JSON.parse(mission.structure);
        return {
          nodes: {
            missions: [...acc.nodes.missions, ...structure.nodes.missions],
            hosts: [...acc.nodes.hosts, ...structure.nodes.hosts],
            services: [...acc.nodes.services, ...structure.nodes.services],
            aggregations: {
              or: [...acc.nodes.aggregations.or, ...structure.nodes.aggregations.or],
              and: [...acc.nodes.aggregations.and, ...structure.nodes.aggregations.and],
            },
          },
          relationships: {
            two_way: [...acc.relationships.two_way, ...structure.relationships.two_way],
            one_way: [...acc.relationships.one_way, ...structure.relationships.one_way],
            supports: [...acc.relationships.supports, ...structure.relationships.supports],
            has_identity: [...acc.relationships.has_identity, ...structure.relationships.has_identity],
          },
        };
      },
      {
        nodes: { missions: [], hosts: [], aggregations: { and: [], or: [] }, services: [] },
        relationships: { two_way: [], one_way: [], supports: [], has_identity: [] },
      }
    );

    return result;
  }
}
