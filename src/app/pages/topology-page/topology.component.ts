import { Component } from '@angular/core';
import { HighchartsChartDirective, providePartialHighcharts } from 'highcharts-angular';
import { DataService } from '../../services/data.service';

@Component({
  templateUrl: './topology.component.html',
  styleUrls: ['./topology.component.scss'],
  imports: [HighchartsChartDirective],
  providers: [
    providePartialHighcharts({
      modules: () => {
        return [
          import('highcharts/esm/highcharts-more'),
          import('highcharts/esm/modules/drilldown'),
        ];
      },
      timeout: 900,
    }),
  ],
})
export class TopologyComponent {
  chartOptions: Highcharts.Options = this.buildChartOptions([]);
  private chartRef: Highcharts.Chart | null = null;
  private allSeries: { name: string; data: { name: string; value: number }[] }[] = [];

  constructor(private data: DataService) {
    this.data.getOrgUnits().subscribe(units => {
      this.allSeries = units.map(unit => ({
        name: unit.name,
        data: unit.subnets.map((subnet: string) => ({
          name: subnet,
          value: 32 - parseInt(subnet.split('/')[1]) || 1,
        })),
      }));
      this.chartOptions = this.buildChartOptions(this.allSeries);
    });
  }

  onChartInstance(chart: Highcharts.Chart): void {
    this.chartRef = chart;
  }

  private buildChartOptions(
    series: { name: string; data: { name: string; value: number }[] }[]
  ): Highcharts.Options {
    return {
      chart: {
        type: 'packedbubble',
        height: '900px',
        animation: true,
        events: {
          drilldown: (e: any) => {
            if (e.seriesOptions) return;
            if (!this.chartRef) return;

            const orgUnit = this.allSeries.find(
              s => s.name === e.point.series.name
            );
            if (!orgUnit) return;

            this.chartRef.addSeriesAsDrilldown(e.point, {
                name: orgUnit.name,
                type: 'packedbubble',
                data: orgUnit.data.map(d => ({ name: d.name, value: d.value })),
            } as any);
            (this.chartRef as any).applyDrilldown();
          },
        },
      },
      title: {
        text: 'Network Topology',
        align: 'left',
      },
      tooltip: {
        pointFormat: '<b>{point.name}</b>',
      },
      plotOptions: {
        packedbubble: {
          minSize: '45%',
          maxSize: '100%',
          layoutAlgorithm: {
            enableSimulation: false,
            gravitationalConstant: 0.05,
            splitSeries: true,
            seriesInteraction: false,
            dragBetweenSeries: false,
            parentNodeLimit: true,
          },
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '{point.name}',
            filter: {
              property: 'y',
              operator: '>',
              value: 250,
            },
            style: {
              color: 'black',
              textOutline: 'none',
              fontWeight: 'normal',
            },
          },
        },
      },
      drilldown: {
        series: [] as any,
        breadcrumbs: {
          position: {
            align: 'right',
          },
        },
      },
      series: series.map(s => ({
        name: s.name,
        data: s.data.map(d => ({
          name: d.name,
          value: d.value,
          drilldown: s.name,
        })),
      })) as any,
    };
  }
}
