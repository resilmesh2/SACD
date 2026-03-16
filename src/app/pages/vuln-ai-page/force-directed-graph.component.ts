import {
  Component,
  ElementRef,
  input,
  Input,
  OnChanges,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import * as d3 from 'd3';
import { GraphEdge, GraphNode } from './neo4j-graph.service';

@Component({
  selector: 'force-directed-graph',
  template: `<div #container></div>`,
})
export class ForceDirectedGraphComponent implements OnChanges, OnDestroy {
  nodes = input<GraphNode[]>([]);
  edges = input<GraphEdge[]>([]);

  @ViewChild('container', { static: true })
  container!: ElementRef<HTMLDivElement>;

  private simulation: d3.Simulation<d3.SimulationNodeDatum, undefined> | null =
    null;

  private readonly width = 1600;
  private readonly height = 800;
  private readonly color = d3.scaleOrdinal(d3.schemePastel2);
  //   '#E4295F',
  //   '#8091ce',
  //   '#44BFEC',
  //   '#cf8585',
  //   '#DDEDAA',
  //   '#F6E27F',
  //   '#ae6fd0',
  //   '#e5b952',
  //   '#5980eb',
  //   '#7ed19c',
  // ]);
  private readonly nodeRadius = 25;

  ngOnChanges(): void {
    this.render();
  }

  ngOnDestroy(): void {
    this.simulation?.stop();
  }

  private render(): void {
    this.simulation?.stop();
    this.container.nativeElement.innerHTML = '';

    const nodes = this.nodes()?.map((n) => ({ ...n, id: n.id }));
    const links = this.edges()?.map((e) => ({
      source: e.source,
      target: e.target,
    }));

    console.log('Rendering graph with nodes:', nodes);
    console.log('Rendering graph with edges:', links);

    this.simulation = d3
      .forceSimulation(nodes as d3.SimulationNodeDatum[])
      .force(
        'link',
        d3.forceLink(links).id((d: any) => d.id).distance(125),
      )
      .force('charge', d3.forceManyBody().strength(-500))
      .force('x', d3.forceX())
      .force('y', d3.forceY());

    const svg = d3
      .create('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('viewBox', [
        -this.width / 2,
        -this.height / 2,
        this.width,
        this.height,
      ])
      .attr('style', 'max-width: 100%; height: auto;');

    const everything = svg.append('g');

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => everything.attr('transform', event.transform));

    (svg as d3.Selection<SVGSVGElement, unknown, any, any>).call(zoom);

    const displayPropertyLookupTable = (node: any) => {
      const type = node.labels[0] as string;
      return {
        'Vulnerability': (node.properties['description']?.toString() || '')?.split('ID')[1],
        'Host': node.properties['hostname'],
        'IP': node.properties['address'],
        'SoftwareVersion': node.properties['version'],
        'Mission': node.properties['name'],
      }[type] as string || node.labels[0] || node.id;
    };

    const link = everything
      .append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke-width', 1.5);

    const node = everything
      .append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', this.nodeRadius)
      .attr('fill', (d) => this.color(d.labels[0] ?? 'default'));

    node.append('title').text((d) => d.id);

    const label = everything
      .append('g')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .text((d) => displayPropertyLookupTable(d))
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('font-size', 11)
      .attr('fill', '#333')
      .attr('pointer-events', 'none');

    (node as d3.Selection<SVGCircleElement, any, any, any>).call(
      d3
        .drag<SVGCircleElement, any>()
        .on('start', (event) => {
          if (!event.active) this.simulation!.alphaTarget(0.3).restart();
          event.subject.fx = event.subject.x;
          event.subject.fy = event.subject.y;
        })
        .on('drag', (event) => {
          event.subject.fx = event.x;
          event.subject.fy = event.y;
        })
        .on('end', (event) => {
          if (!event.active) this.simulation!.alphaTarget(0);
          event.subject.fx = null;
          event.subject.fy = null;
        }),
    );

    this.simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node.attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y);
      label.attr('x', (d: any) => d.x).attr('y', (d: any) => d.y);
    });

    this.container.nativeElement.appendChild(svg.node()!);
  }
}
