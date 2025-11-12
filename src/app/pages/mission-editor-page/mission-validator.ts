import { WritableSignal } from "@angular/core";
import { Connection, MissionNode } from "./flow-editor/flow-editor.component";

export class MissionValidator {
    private resetValidationStates(nodes: WritableSignal<MissionNode[]>): void {
        nodes.update(nodes => {
            return nodes.map(node => {
                node.validation.error = false;
                node.validation.reason = '';
                return node;
            });
        });
    }

    validateMission(nodes: WritableSignal<MissionNode[]>, connections: WritableSignal<Connection[]>): boolean {
        let isValid = true;
        this.resetValidationStates(nodes);

        nodes.update(nodes => {
            return nodes.map(node => {
                if (node.type === 'host') {
                    const hostValid = this.validateHostNode(node, nodes, connections());
                    if (!hostValid) {
                        isValid = false;
                    }
                }
                else if (node.type === 'or') {
                    const orValid = this.validateORNode(node, nodes, connections());
                    if (!orValid) {
                        isValid = false;
                    }
                }
                else if (node.type === 'and') {
                    const andValid = this.validateANDNode(node, nodes, connections());
                    if (!andValid) {
                        isValid = false;
                    }
                } else if (node.type === 'component') {
                    const serviceValid = this.validateServiceNode(node, nodes, connections());
                    if (!serviceValid) {
                        isValid = false;
                    }
                }

                return node;
            });
        });

        return isValid;
    }

    private checkIfNodeHasParent(node: MissionNode, nodes: MissionNode[], connections: Connection[]): boolean {
        for (const conn of nodes) {
            if (conn.type === 'or' || conn.type === 'and') {
                const hasConnection = nodes.some(n => 
                    n.id === conn.id && 
                    connections.some(c => c.from === `${conn.id}-output` && c.to === `${node.id}-input`)
                );
                if (hasConnection) {
                    return true;
                }
            }
        }
        return false;
    }

    private validateServiceNode(node: MissionNode, nodes: MissionNode[], connections: Connection[]): boolean {
        // service node must have OR/AND node as parent
        if (!this.checkIfNodeHasParent(node, nodes, connections)) {
            node.validation.error = true;
            node.validation.reason = 'Service must have a parent OR/AND node.';
            return false;
        }

        return true;
    }

    private validateHostNode(node: MissionNode, nodes: MissionNode[], connections: Connection[]): boolean {
        // host node must either  have a parent OR/AND node
        if (!this.checkIfNodeHasParent(node, nodes, connections)) {
            node.validation.error = true;
            node.validation.reason = 'Host node must have a parent OR/AND node.';
            return false;
        }

        if (!node.data.hostname) {
            node.validation.error = true;
            node.validation.reason = 'Missing hostname';
            return false;
        }

        return true;
    }

    private validateORNode(node: MissionNode, nodes: MissionNode[], connections: Connection[]): boolean {
        // OR node must have AND node as a parent and at least one child
        const hasANDParent = nodes.some(n => 
            n.type === 'and' && 
            connections.some(c => c.from === `${n.id}-output` && c.to === `${node.id}-input`)
        );

        if (!hasANDParent) {
            node.validation.error = true;
            node.validation.reason = 'OR node must have AND node as a parent.';
            return false;
        }

        const hasChild = nodes.some(n => 
            connections.some(c => c.from === `${node.id}-output` && c.to === `${n.id}-input`)
        );

        if (!hasChild) {
            node.validation.error = true;
            node.validation.reason = 'OR node must have at least one child.';
            return false;
        }

        return true;
    }

    private validateANDNode(node: MissionNode, nodes: MissionNode[], connections: Connection[]): boolean {
        // AND node must have at least one child
        const hasChild = nodes.some(n => 
            connections.some(c => c.from === `${node.id}-output` && c.to === `${n.id}-input`)
        );

        if (!hasChild) {
            node.validation.error = true;
            node.validation.reason = node.id === '1' ? 'Mission needs at least one service' : 'Service needs at least one host';
            return false;
        }

        return true;
    }
}