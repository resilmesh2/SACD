import { entities, EntityStructure } from './entities.config';
import { GraphInput } from '../../models/graph.model';
import { Node, Edge } from '@swimlane/ngx-graph';
import _ from 'lodash';

/**
 * Returns label of ngx-graph node based on static config
 * @param node
 */
export function getLabelOfGraphNode(node: Node): string {
  const initialLabel: keyof EntityStructure = node.data.type;
  if (typeof entities[initialLabel] === 'undefined') {
    return initialLabel;
  }
  if (entities[initialLabel].showProperty.length === 0) {
    return initialLabel;
  }
  const propKey = entities[initialLabel].showProperty.find(
    (pk) => typeof node.data[pk] !== 'undefined' && node.data[pk] !== null,
  );
  if (propKey === undefined) {
    return '';
  }
  if (typeof node.data[propKey] === 'undefined') {
    return initialLabel;
  }
  return node.data[propKey].toString();
}

/**
 * Gets label of given node based on static config
 * @param node
 */

export function getLabel(node: any): string {
  const initialLabel: keyof EntityStructure = node.__typename;

  if (typeof entities[initialLabel] === 'undefined' || entities[initialLabel].showProperty.length === 0) {
    return initialLabel;
  }

  const propKey = entities[initialLabel].showProperty.find(
    (pk) => typeof node[pk] !== 'undefined' && node[pk] !== null,
  );

  if (propKey === undefined || node[propKey] === null || node[propKey] === undefined) {
    return '';
  }

  return node[propKey].toString();
}

/**
 * Converts graph data to ngx-graph compliant format
 * @param data
 * @param parent
 * @param edgeName
 */
export function converToGraph(data: any[], parent?: string, edgeName?: string): GraphInput {
  let nodes: Node[] = [];
  let edges: Edge[] = [];

  data.forEach((item) => {
    if (nodes.findIndex((n) => n.id === item._id) === -1) {
      nodes.push({
        id: item._id,
        label: getLabelOfGraphNode({ id: item._id, label: '', data: item }),
        data: {
          customColor: getColor(item),
          textColor: getTextColor(item),
          type: item.__typename,
          labelName: getLabelName(item),
          ...clearAttributes(item),
        },
      });
    }

    if (parent) {
      edges.push({ source: parent, target: item._id, label: edgeName });
    }

    Object.keys(item).forEach((key) => {
      if (Array.isArray(item[key]) && item[key].length > 0 && item[key][0].__typename) {
        const { nodes: newNodes, edges: newEdges } = converToGraph(item[key], item._id, key);
        nodes = _.unionBy(nodes, newNodes, (n) => n.id);
        edges = _.unionBy(edges, newEdges, (e) => [e.source, e.target, e.label]);
      }
    });
  });

  return { nodes, edges };
}

/**
 * Gets label name of given node (eg. DomainName, IP)
 * @param node
 */

export function getLabelName(node: any): string {
  const initialLabel: keyof EntityStructure = node.__typename;

  if (typeof entities[initialLabel] === 'undefined' || entities[initialLabel].showProperty.length === 0) {
    return initialLabel;
  }

  const propKey = entities[initialLabel].showProperty.find(
    (pk) => typeof node[pk] !== 'undefined' && node[pk] !== null,
  );

  if (propKey === undefined) {
    return '';
  }

  return propKey;
}

/**
 * Return color that should be assigned to given node
 * @param node
 */
function getColor(node: any): string {
  const initialLabel: keyof EntityStructure = node.__typename;
  return entities[initialLabel]?.bgColor || '#DC4141';
}

/**
 * Return text color that should be assigned to given node
 * @param node
 */
function getTextColor(node: any): string {
  const initialLabel: keyof EntityStructure = node.__typename;
  return entities[initialLabel]?.textColor || '#fff';
}

/**
 * Clears unneccessery attributes of item
 * @param item
 */
function clearAttributes(item: any) {
  const clonedItem = { ...item };
  delete clonedItem._id;
  delete clonedItem.__typename;
  return clonedItem;
}
