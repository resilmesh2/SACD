import { OverlayModule } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, input, model, ModelSignal, OnInit, signal, viewChild, ViewChild, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { IPoint } from '@foblex/2d';
import { EFMarkerType, FCanvasComponent, FCreateConnectionEvent, FFlowComponent, FFlowModule, FSelectionChangeEvent, FZoomDirective } from '@foblex/flow';
import { SentinelButtonWithIconComponent } from "@sentinel/components/button-with-icon";
import { CdkNoDataRow } from "@angular/cdk/table";
import { NgTemplateOutlet } from '@angular/common';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { AddExistingHostDialog } from './add-existing-host-dialog/add-existing-host.dialog';

export type Connection = {
    from: string;
    to: string;
};

export type MissionNodeType = 'root' | 'and' | 'or' | 'component' | 'host';
export type AggregationLayer = 'component-or' | 'host-or' | 'component' | 'host' | 'component-and' | 'root-and';

export type MissionNodeData = {
    name?: string;
    hostname?: string;
    ip?: string;
}

export type MissionNode = {
    id: string;
    name: string;
    type: MissionNodeType;
    position: { x: number; y: number };
    layer?: AggregationLayer;
    isEditing?: boolean;
    data: MissionNodeData;
    validation: {
        error: boolean;
        reason: string;
    }
}

const LAYER_Y = {
    COMPONENT_GROUP: 200,
    COMPONENT: 300,
    COMPONENT_AND_AGGREGATION: 400,
    HOST_GROUP: 500,
    HOST: 600
}

const LAYER_RULES = {
    'root-and': ['component-or', 'component'],
    'component-or': ['component'],
    'component-and': ['host-or', 'host'],
    'host-or': ['host'],
    'component': ['component-and'],
    'host': []
}

@Component({
  selector: 'flow-editor',
  styleUrls: [ './flow-editor.component.scss' ],
  templateUrl: './flow-editor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FFlowModule,
    FZoomDirective,
    MatIconModule,
    OverlayModule,
    MatLabel,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    SentinelButtonWithIconComponent,
    NgTemplateOutlet,
    MatMenuModule
]
})
export class FlowEditorComponent implements OnInit {

    @ViewChild(FCanvasComponent, { static: true })
    public fCanvas!: FCanvasComponent;

    @ViewChild(FZoomDirective, { static: true })
    protected fZoom!: FZoomDirective;

    @ViewChild(FFlowComponent, { static: true })
    protected fFlow!: FFlowComponent;

    protected readonly eMarkerType = EFMarkerType;

    missionName = input<string | null>(null);
    globalIdIncrement = signal(1);

    centerOnAdd = true;
    isOpen = false;

    public connections: ModelSignal<Connection[]> = model([] as Connection[]);
    public nodes: ModelSignal<MissionNode[]> = model([] as MissionNode[]);

    protected selected = signal<string[]>([]);

    constructor(
        private changeDetectorRef: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        // this.nodes.update(_ => {
        //     return [
        //         { id: 'root', name: 'Mission', type: 'root', position: { x: 0, y: 0 }, data: {} },
        //         { id: '1', name: 'AND', type: 'and', position: { x: 0, y: 100 }, layer: 'root-and', data: {} },
        //     ];
        // });
        addEventListener('keydown', (event: KeyboardEvent) => {
            // Delete selected nodes/connections on Delete or Backspace key press
            if (event.key === 'Delete' || event.key === 'Backspace') {
                this.deleteSelected();
            }
        });
    }

    readonly menuTrigger = viewChild.required(MatMenuTrigger);
    readonly dialog = inject(MatDialog);

    openAddExistingHostDialog() {
        const dialogRef = this.dialog.open(AddExistingHostDialog, { restoreFocus: false });

        // Manually restore focus to the menu trigger since the element that
        // opens the dialog won't be in the DOM any more when the dialog closes.
        dialogRef.afterClosed().subscribe(() => this.menuTrigger().focus());
    }

    public onLoaded(): void {
        this.fCanvas.resetScaleAndCenter(false);
    }

    public createNode(name: string, type: MissionNodeType, position: { x: number; y: number }, layer?: AggregationLayer, data: MissionNodeData = {}): number {
        this.globalIdIncrement.set(this.globalIdIncrement() + 1);
        const newId = this.globalIdIncrement();

        const currentNodes = this.nodes();
        currentNodes?.push({ id: newId.toString(), name, type, position, layer, data, validation: { error: false, reason: '' } });
        this.nodes.set(currentNodes);
        this.changeDetectorRef.detectChanges();

        if (this.centerOnAdd) {
            this.fCanvas.resetScaleAndCenter(false);
        }

        return newId;
    }

    public createConnection(fromId: string, toId: string): void {
        this.connections.update((conns) => {
            conns.push({ from: fromId, to: toId });
            return conns;
        });
        this.changeDetectorRef.detectChanges();
    }

    protected onSelectionChange(event: FSelectionChangeEvent): void {
        this.selected.update((x) => {
            return [
                ...event.fNodeIds,
                ...event.fConnectionIds
            ];
        });
    }

    protected selectNodes(nodes: string[]): void {
        this.fFlow?.select(nodes, []);
    }

    // Returns array of parent services IDs of selected AND nodes
    // Used to delete parent services when deleting AND nodes
    getParentOfANDNode(): string[] {
        return this.nodes().flatMap(node => {
            if (node.type === 'and') {
                if (this.selected().includes(`f-node-${node.id}`)) {
                    const parentConnection = this.connections().find(conn => conn.to === `${node.id}-input`);
                    if (parentConnection) {
                        return parentConnection.from.split('-')[0];
                    }
                }
            }
            return undefined;
        }).filter(x => x !== undefined);
    }

    // Deletes all selected nodes and connections
    // Also deletes parent services of selected AND nodes
    // Does not allow deleting root node or root AND node
    public deleteSelected(): void {
        if (this.selected().length === 0) {
            return;
        }

        if (this.selected().includes('f-node-root') || this.selected().includes('f-node-1')) {
            // Do not allow deleting root node
            return;
        }

        const parentsOfAND = this.getParentOfANDNode();

        this.connections.set(this.connections().filter(conn => {
            const fromId = conn.from.split('-')[0];
            const toId = conn.to.split('-')[0];
            return !this.selected().includes(`f-node-${fromId}`) 
                && !this.selected().includes(`f-node-${toId}`) 
                && !parentsOfAND.includes(fromId) 
                && !parentsOfAND.includes(toId);
        }));

        this.nodes.set(this.nodes().filter(node => {
            console.log('Checking node for deletion:', node.id, parentsOfAND.includes(node.id));
            return !this.selected().includes(`f-node-${node.id}`) && !parentsOfAND.includes(node.id);
        }));

        this.changeDetectorRef.detectChanges();
    }

    public onCreateConnection(event: FCreateConnectionEvent): void {
        if (!event.fInputId) {
            return;
        }
        this.connections.update((conns) => {
            conns.push({ from: event.fOutputId, to: event.fInputId || '' });
            return conns;
        });
        this.changeDetectorRef.detectChanges();
    }

    getAllowedConnections(layer?: AggregationLayer): string[] {
        if (!layer) {
            return [];
        }
        return LAYER_RULES[layer] || [];
    }

    componentGroupXOffset = signal({ base: 0, step: 400, direction: 1 });
    componentGroupCount = signal(0);

    updateComponentGroupXOffset(): void {
        const currentOffset = this.componentGroupXOffset();
        this.componentGroupXOffset.set({
            base: currentOffset.step * currentOffset.direction,
            step: currentOffset.step,
            direction: currentOffset.direction * -1
        });

        this.componentGroupCount.set(this.componentGroupCount() + 1);
    }

    getChildOffsets({base, step, direction}: {  base: number; step: number; direction: number }): {left: number; right: number} {
        const left = base + 100 * direction;
        const right = base - 100 * direction;
        return { left, right };
    }

    public addComponentGroup(): void {
        const orId = this.createNode(
            'OR',
            'or',
            { x: this.componentGroupXOffset().base, y: LAYER_Y.COMPONENT_GROUP },
            'component-or'
        );

        this.createConnection('1-output', `${orId}-input`);

        const childOffsets = this.getChildOffsets(this.componentGroupXOffset());

        const componentAId = this.createNode(
            'A',
            'component',
            { x: childOffsets.left, y: LAYER_Y.COMPONENT },
            'component'
        );

        const componentAAddId= this.createNode(
            'AND',
            'and',
            { x: childOffsets.left, y: LAYER_Y.COMPONENT_AND_AGGREGATION },
            'component-and'
        );

        const componentBId = this.createNode(
            'B',
            'component',
            { x: childOffsets.right, y: LAYER_Y.COMPONENT },
            'component'
        );

        const componentBAddId = this.createNode(
            'AND',
            'and',
            { x: childOffsets.right, y: LAYER_Y.COMPONENT_AND_AGGREGATION },
            'component-and'
        );

        this.createConnection(`${orId}-output`, `${componentAId}-input`);
        this.createConnection(`${orId}-output`, `${componentBId}-input`);
            
        this.createConnection(`${componentAId}-output`, `${componentAAddId}-input`);
        this.createConnection(`${componentBId}-output`, `${componentBAddId}-input`);
        this.updateComponentGroupXOffset();
        this.selectNodes(
            [`f-node-${orId}`, `f-node-${componentAId}`, `f-node-${componentBId}`, `f-node-${componentAAddId}`, `f-node-${componentBAddId}`],
        );
    }

    public addComponentNode(): void {
        const componentId = this.createNode(
            'Component',
            'component',
            { x: 700, y: LAYER_Y.COMPONENT },
            'component'
        );
        const andId = this.createNode(
            'AND',
            'and',
            { x: 700, y: LAYER_Y.COMPONENT_AND_AGGREGATION },
            'component-and'
        );

        this.createConnection(`${componentId}-output`, `${andId}-input`);
        this.selectNodes(
            [`f-node-${componentId}`, `f-node-${andId}`],
        );     
    }

    getCurrentPositions(): { id: string; position: IPoint }[] {
        const positions = this.fFlow.getState().nodes;
        return positions.map(node => {
            return { id: node.id.split('f-node-')[1], position: node.position };
        });
    }

    findEmptyXPositionAtLayer(layer: AggregationLayer): number {
        const nodesAtLayer = this.nodes().filter(node => node.layer === layer);
        const currentPositions = this.getCurrentPositions();

        console.log('Nodes at layer', currentPositions, nodesAtLayer);

        const usedXPositions = nodesAtLayer.map(node => {
            const pos = currentPositions.find(p => p.id === node.id);
            return pos ? pos.position.x : null;
        }).filter(x => x !== null) as number[];

        const minX = Math.min(...usedXPositions);
        const maxX = Math.max(...usedXPositions);

        const closestEmptyX = Math.abs(minX) < Math.abs(maxX) ? minX : maxX;

        const finalX = closestEmptyX + (closestEmptyX > 0 ? 200 : -200);                

        console.log('Used X Positions at layer', layer, usedXPositions, finalX);
        return finalX;
    }

    public addHostGroup(): void {
        const orId = this.createNode(
            'OR',
            'or',
            { x: 300, y: LAYER_Y.HOST_GROUP },
            'host-or'
        );
        const hostAId = this.addHostNode('Host A', undefined, 200);
        const hostBId = this.addHostNode('Host B', undefined, 400);

        this.createConnection(`${orId}-output`, `${hostAId}-input`);
        this.createConnection(`${orId}-output`, `${hostBId}-input`);
        this.selectNodes(
            [`f-node-${orId}`, `f-node-${hostAId}`, `f-node-${hostBId}`],
        );
    }

    public addHostNode(hostname?: string, ip?: string, x?: number): number {
        const hostId = this.createNode(
            hostname || 'HOST',
            'host',
            { x: x || 400, y: LAYER_Y.HOST },
            'host',
            { hostname: hostname || Math.random().toString(36).substring(2, 7) , ip }
        );

        this.selectNodes(
            [`f-node-${hostId}`],
        );
        return hostId;
    }

    printNodes(): void {
        console.log(this.fFlow.getState().nodes);
        console.log(JSON.stringify(this.nodes(), null, 2));
    }

}