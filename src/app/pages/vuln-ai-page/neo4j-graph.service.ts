export interface GraphNode {
  id: string;
  labels: string[];
  properties: Record<string, unknown>;
}

export interface GraphEdge {
  id: string;
  type: string;
  source: string;
  target: string;
  properties: Record<string, unknown>;
}

export interface GraphResult {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

type TypedValue = { $type: string; _value: unknown };

function unwrapTypedValue(typed: unknown): unknown {
  const t = typed as TypedValue;
  switch (t.$type) {
    case 'Integer':
      return parseInt(t._value as string, 10);
    case 'Float':
      return parseFloat(t._value as string);
    case 'Boolean':
      return t._value;
    case 'List':
      return (t._value as unknown[]).map(unwrapTypedValue);
    default:
      return t._value;
  }
}

function unwrapProperties(
  props: Record<string, unknown>,
): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(props).map(([k, v]) => [k, unwrapTypedValue(v)]),
  );
}

function visit(
  val: unknown,
  nodesMap: Map<string, GraphNode>,
  edgesMap: Map<string, GraphEdge>,
): void {
  if (!val || typeof val !== 'object') return;
  const t = val as TypedValue;

  switch (t.$type) {
    case 'Node': {
      const v = t._value as Record<string, unknown>;
      const id = v['_element_id'] as string;
      if (!nodesMap.has(id)) {
        nodesMap.set(id, {
          id: id,
          labels: (v['_labels'] as string[]) ?? [],
          properties: unwrapProperties(
            (v['_properties'] as Record<string, unknown>) ?? {},
          ),
        });
      }
      break;
    }
    case 'Relationship': {
      const v = t._value as Record<string, unknown>;
      const id = v['_element_id'] as string;
      if (!edgesMap.has(id)) {
        edgesMap.set(id, {
          id: id,
          type: v['_type'] as string,
          source: v['_start_node_element_id'] as string,
          target: v['_end_node_element_id'] as string,
          properties: unwrapProperties(
            (v['_properties'] as Record<string, unknown>) ?? {},
          ),
        });
      }
      break;
    }
    case 'List': {
      for (const item of (t._value as unknown[]) ?? []) {
        visit(item, nodesMap, edgesMap);
      }
      break;
    }
    case 'Path': {
      for (const item of (t._value as unknown[]) ?? []) {
        visit(item, nodesMap, edgesMap);
      }
      break;
    }
  }
}

function convertId(id: string): string {
  const parts = id.split(':');
  return parts[parts.length - 1] || id;
}

export function parseNeo4jGraphResponse(response: unknown): GraphResult {
  const nodesMap = new Map<string, GraphNode>();
  const edgesMap = new Map<string, GraphEdge>();

  const data = (response as Record<string, unknown>)['data'] as Record<
    string,
    unknown
  >;
  for (const row of (data?.['values'] as unknown[][]) ?? []) {
    for (const cell of row) visit(cell, nodesMap, edgesMap);
  }

  return {
    nodes: Array.from(nodesMap.values()),
    edges: Array.from(edgesMap.values()),
  };
}
