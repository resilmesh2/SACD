import { ChangeDetectionStrategy, ChangeDetectorRef, Component, input, signal, ViewChild, WritableSignal } from '@angular/core';
import { global } from '@apollo/client/utilities/globals';
import { FCanvasComponent, FCreateConnectionEvent, FFlowModule, FZoomDirective } from '@foblex/flow';
import { SentinelButtonWithIconComponent } from '@sentinel/components/button-with-icon';

type Connection = {
    from: string;
    to: string;
};

type MissionNodeType = 'root' | 'and' | 'or' | 'component' | 'host';
type AggregationLayer = 'component-group' | 'host-group';

type MissionNode = {
    id: string;
    name: string;
    type: MissionNodeType;
    position: { x: number; y: number };
    layer?: AggregationLayer;
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

    missionName = input<string | null>(null);
    globalIdIncrement = signal(1);
    centerOnAdd = true;

    public connections: Connection[] = [
        { from: 'root-output', to: '1-input' },
    ];

    public nodes: WritableSignal<MissionNode[]> = signal([
        { id: 'root', name: 'Mission', type: 'root', position: { x: 0, y: 0 } },
        { id: '1', name: 'AND', type: 'and', position: { x: 0, y: 100 } },
    ]);

    LAYER_Y = {
        COMPONENT_GROUP: 200,
        COMPONENT: 300,
        COMPONENT_AND_AGGREGATION: 400,
        HOST_GROUP: 500,
        HOST: 600
    }

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
            { x: this.componentGroupXOffset().base, y: this.LAYER_Y.COMPONENT_GROUP },
            'component-group'
        );

        this.createConnection('1-output', `${orId}-input`);

        const childOffsets = this.getChildOffsets(this.componentGroupXOffset());

        const componentAId = this.createNode(
            'A',
            'component',
            { x: childOffsets.left, y: this.LAYER_Y.COMPONENT }
        );

        const componentAAddId= this.createNode(
            'AND',
            'and',
            { x: childOffsets.left, y: this.LAYER_Y.COMPONENT_AND_AGGREGATION }
        );

        const componentBId = this.createNode(
            'B',
            'component',
            { x: childOffsets.right, y: this.LAYER_Y.COMPONENT }
        );

        const componentBAddId = this.createNode(
            'AND',
            'and',
            { x: childOffsets.right, y: this.LAYER_Y.COMPONENT_AND_AGGREGATION }
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
            { x: 700, y: this.LAYER_Y.COMPONENT }
        );
        const andId = this.createNode(
            'AND',
            'and',
            { x: 700, y: this.LAYER_Y.COMPONENT_AND_AGGREGATION }
        );

        this.createConnection(`${componentId}-output`, `${andId}-input`);        
    }

    public addHostGroup(): void {
        const orId = this.createNode(
            'OR',
            'or',
            { x: 700, y: this.LAYER_Y.HOST_GROUP },
            'host-group'
        );
        const hostAId = this.createNode(
            'Host A',
            'host',
            { x: 600, y: this.LAYER_Y.HOST }
        );
        const hostBId = this.createNode(
            'Host B',
            'host',
            { x: 800, y: this.LAYER_Y.HOST }
        );

        this.createConnection(`${orId}-output`, `${hostAId}-input`);
        this.createConnection(`${orId}-output`, `${hostBId}-input`);
    }

    public addHostNode(): void {
        this.createNode(
            'Host',
            'host',
            { x: 600, y: this.LAYER_Y.HOST }
        );
    }

    printNodes(): void {
        console.log(JSON.stringify(this.nodes(), null, 2));
    }

}