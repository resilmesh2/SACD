import { ChangeDetectionStrategy, ChangeDetectorRef, Component, input, signal, ViewChild, WritableSignal } from '@angular/core';
import { IPoint } from '@foblex/2d';
import { FCanvasComponent, FCreateConnectionEvent, FFlowComponent, FFlowModule, FZoomDirective } from '@foblex/flow';

type Connection = {
    from: string;
    to: string;
};

type MissionNodeType = 'root' | 'and' | 'or' | 'component' | 'host';
type AggregationLayer = 'component-or' | 'host-or' | 'component' | 'host' | 'component-and' | 'root-and';

type MissionNode = {
    id: string;
    name: string;
    type: MissionNodeType;
    position: { x: number; y: number };
    layer?: AggregationLayer;
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
    FZoomDirective
  ]
})
export class FlowEditorComponent {

    @ViewChild(FCanvasComponent, { static: true })
    public fCanvas!: FCanvasComponent;

    @ViewChild(FZoomDirective, { static: true })
    protected fZoom!: FZoomDirective;

    @ViewChild(FFlowComponent, { static: true })
    protected fFlow!: FFlowComponent;

    missionName = input<string | null>(null);
    globalIdIncrement = signal(1);
    centerOnAdd = true;

    public connections: Connection[] = [
        { from: 'root-output', to: '1-input' },
    ];

    public nodes: WritableSignal<MissionNode[]> = signal([
        { id: 'root', name: 'Mission', type: 'root', position: { x: 0, y: 0 } },
        { id: '1', name: 'AND', type: 'and', position: { x: 0, y: 100 }, layer: 'root-and' },
    ]);


    constructor(
        private changeDetectorRef: ChangeDetectorRef
    ) {
    }

    public onLoaded(): void {
        this.fCanvas.resetScaleAndCenter(false);
    }

    public onCreateConnection(event: FCreateConnectionEvent): void {
        if (!event.fInputId) {
            return;
        }
        this.connections.push({ from: event.fOutputId, to: event.fInputId });
        this.changeDetectorRef.detectChanges();
    }

    public createNode(name: string, type: MissionNodeType, position: { x: number; y: number }, layer?: AggregationLayer): number {
        this.globalIdIncrement.set(this.globalIdIncrement() + 1);
        const newId = this.globalIdIncrement();

        const currentNodes = this.nodes();
        currentNodes.push({ id: newId.toString(), name, type, position, layer });
        this.nodes.set(currentNodes);
        this.changeDetectorRef.detectChanges();

        if (this.centerOnAdd) {
            this.fCanvas.resetScaleAndCenter(false);
        }

        return newId;
    }

    public createConnection(fromId: string, toId: string): void {
        this.connections.push({ from: fromId, to: toId });
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
        const hostAId = this.createNode(
            'Host A',
            'host',
            { x: 200, y: LAYER_Y.HOST },
            'host'
        );
        const hostBId = this.createNode(
            'Host B',
            'host',
            { x: 400, y: LAYER_Y.HOST },
            'host'
        );

        this.createConnection(`${orId}-output`, `${hostAId}-input`);
        this.createConnection(`${orId}-output`, `${hostBId}-input`);
    }

    public addHostNode(): void {
        //const emptyX = this.findEmptyXPositionAtLayer('host');
        this.createNode(
            'Host',
            'host',
            { x: 600, y: LAYER_Y.HOST },
            'host'
        );
    }

    printNodes(): void {
        console.log(this.fFlow.getState().nodes);
        console.log(JSON.stringify(this.nodes(), null, 2));
    }

}