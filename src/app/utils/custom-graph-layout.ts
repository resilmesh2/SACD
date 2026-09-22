import * as dagre from 'dagre';
import { Graph, Layout, Edge, Node } from '@swimlane/ngx-graph';

export enum Orientation {
  LEFT_TO_RIGHT = 'LR',
  RIGHT_TO_LEFT = 'RL',
  TOP_TO_BOTTOM = 'TB',
  BOTTOM_TO_TOP = 'BT',
}
export enum Alignment {
  CENTER = 'C',
  UP_LEFT = 'UL',
  UP_RIGHT = 'UR',
  DOWN_LEFT = 'DL',
  DOWN_RIGHT = 'DR',
}

export interface DagreSettings {
  orientation?: Orientation;
  marginX?: number;
  marginY?: number;
  edgePadding?: number;
  rankPadding?: number;
  nodePadding?: number;
  align?: Alignment;
  acyclicer?: 'greedy' | undefined;
  ranker?: 'network-simplex' | 'tight-tree' | 'longest-path';
  multigraph?: boolean;
  compound?: boolean;
}

export class CustomLayout implements Layout {
  defaultSettings: DagreSettings = {
    orientation: Orientation.TOP_TO_BOTTOM,
    marginX: 20,
    marginY: 20,
    edgePadding: 100,
    rankPadding: 100,
    nodePadding: 50,
    multigraph: true,
    compound: true,
  };
  settings: DagreSettings = {};

  dagreGraph: any;
  dagreNodes: any;
  dagreEdges: any;

  constructor(orientation?: Orientation) {
    if (orientation) {
      this.settings.orientation = orientation;
    }
  }

  // Rebuilt on every run() so it always matches the graph being laid out. Without it,
  // the per-node lookups below are a linear scan inside a loop over every node, which
  // makes laying out the graph quadratic in its size.
  private nodeById = new Map<string, Node>();

  private findNode(graph: Graph, id: string): Node | undefined {
    const indexed = this.nodeById.get(id);
    if (indexed) {
      return indexed;
    }
    // updateEdge can be reached without run() having indexed this graph first; reindexing
    // on a miss costs the same as the scan it replaces, so this is never worse.
    this.indexNodes(graph);
    return this.nodeById.get(id);
  }

  private indexNodes(graph: Graph): void {
    this.nodeById.clear();
    for (const node of graph.nodes) {
      this.nodeById.set(node.id, node);
    }
  }

  run(graph: Graph): Graph {
    this.createDagreGraph(graph);
    dagre.layout(this.dagreGraph);

    graph.edgeLabels = this.dagreGraph._edgeLabels;
    this.indexNodes(graph);

    for (const dagreNodeId in this.dagreGraph._nodes) {
      if (this.dagreGraph._nodes.hasOwnProperty(dagreNodeId)) {
        const dagreNode = this.dagreGraph._nodes[dagreNodeId];
        const node = this.nodeById.get(dagreNode.id);
        if (node === undefined) {
          return graph;
        }
        node.position = {
          x: dagreNode.x,
          y: dagreNode.y,
        };
        node.dimension = {
          width: dagreNode.width,
          height: dagreNode.height,
        };
      }
    }

    return graph;
  }

  updateEdge(graph: Graph, edge: Edge): Graph {
    const sourceNode = this.findNode(graph, edge.source);
    const targetNode = this.findNode(graph, edge.target);

    if (
      sourceNode?.position === undefined ||
      sourceNode?.dimension?.height === undefined ||
      targetNode?.position === undefined ||
      targetNode?.dimension?.height === undefined
    ) {
      return graph;
    }

    // determine new arrow position
    const dir = sourceNode.position.y <= targetNode.position.y ? -1 : 1;
    const startingPoint = {
      x: sourceNode.position.x,
      y: sourceNode.position.y - dir * (sourceNode.dimension.height / 2),
    };
    const endingPoint = {
      x: targetNode.position.x,
      y: targetNode.position.y + dir * (targetNode.dimension.height / 2),
    };

    // generate new points
    edge.points = [startingPoint, endingPoint];
    return graph;
  }

  createDagreGraph(graph: Graph): any {
    const settings = Object.assign({}, this.defaultSettings, this.settings);
    this.dagreGraph = new dagre.graphlib.Graph({
      compound: settings.compound,
      multigraph: settings.multigraph,
    });

    this.dagreGraph.setGraph({
      rankdir: settings.orientation,
      marginx: settings.marginX,
      marginy: settings.marginY,
      edgesep: settings.edgePadding,
      ranksep: settings.rankPadding,
      nodesep: settings.nodePadding,
      align: settings.align,
      acyclicer: settings.acyclicer,
      ranker: settings.ranker,
      multigraph: settings.multigraph,
      compound: settings.compound,
    });

    // Default to assigning a new object as a label for each new edge.
    this.dagreGraph.setDefaultEdgeLabel(() => {
      return {
        /* empty */
      };
    });

    this.dagreNodes = graph.nodes.map((n) => {
      const node: any = Object.assign({}, n);
      if (n.dimension !== undefined && n.dimension !== null) {
        node.width = n.dimension.width;
        node.height = n.dimension.height;
      }

      if (n.position !== undefined && n.position !== null) {
        node.x = n.position.x;
        node.y = n.position.y;
      }

      return node;
    });

    this.dagreEdges = graph.edges.map((l) => {
      let linkId = 1;
      const newLink: any = Object.assign({}, l);
      if (!newLink.id) {
        newLink.id = 'a' + linkId.toString();
        linkId++;
      }
      return newLink;
    });

    for (const node of this.dagreNodes) {
      if (!node.width) {
        node.width = 20;
      }
      if (!node.height) {
        node.height = 30;
      }

      // update dagre
      this.dagreGraph.setNode(node.id, node);
    }

    // update dagre
    for (const edge of this.dagreEdges) {
      if (settings.multigraph) {
        this.dagreGraph.setEdge(edge.source, edge.target, edge, edge.id);
      } else {
        this.dagreGraph.setEdge(edge.source, edge.target);
      }
    }

    return this.dagreGraph;
  }
}
