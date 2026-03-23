import { Node } from '@swimlane/ngx-graph';
import { entities, EntityStructure } from './entities.config';

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
