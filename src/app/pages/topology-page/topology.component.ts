import { Component } from '@angular/core';
import { HighchartsChartDirective, providePartialHighcharts } from 'highcharts-angular';
import { DataService } from '../../services/data.service';
import { OrgUnitData } from '../../models/org-unit.model';

@Component({
  templateUrl: './topology.component.html',
  styleUrls: ['./topology.component.scss'],
  imports: [HighchartsChartDirective],
  providers: [
    providePartialHighcharts({
      modules: () => {
        return [
          // Load Packed Bubble Chart
          import('highcharts/esm/highcharts-more'),
        ];
      },
      timeout: 900, // Optional: increase timeout for loading modules
    }),
  ],
})
export class TopologyComponent {
    chartOptions: Highcharts.Options = this.buildChartOptions([]);

    constructor(private data: DataService) {
        this.data.getOrgUnits().subscribe(units => {
            const mapped = units.map(unit => ({
                name: unit.name,
                data: unit.subnets.map((subnet: string) => ({
                    name: subnet,
                    value: 32 - parseInt(subnet.split('/')[1]) || 1
                }))
            }));
            this.chartOptions = this.buildChartOptions(mapped);
        });
    }

  private buildChartOptions(series: { name: string, data: { name: string, value: number }[] }[]): Highcharts.Options {
    return {
      chart: {
          type: 'packedbubble',
          height: '900px',
          animation: true
      },
      title: {
          text: 'Network Topology',
          align: 'left'
      },
    //   subtitle: {
    //       text: 'Source: <a href="https://en.wikipedia.org/wiki/List_of_countries_by_carbon_dioxide_emissions" target="_blank">Wikipedia</a>',
    //       align: 'left'
    //   },
      tooltip: {
          pointFormat: '<b>{point.name}</b>'
      },
      plotOptions: {
          packedbubble: {
              minSize: '50%',
              maxSize: '100%',
              layoutAlgorithm: {
                  enableSimulation: false,
                  gravitationalConstant: 0.05,
                  splitSeries: true,
                  seriesInteraction: false,
                  dragBetweenSeries: false,
                  parentNodeLimit: true
              },
              cursor: 'pointer',
              point: {
                  events: {
                      click: (event: any) => {
                          this.onBubbleClick(event);
                      }
                  }
              },
              dataLabels: {
                  enabled: true,
                  format: '{point.name}',
                  filter: {
                      property: 'y',
                      operator: '>',
                      value: 250
                  },
                  style: {
                      color: 'black',
                      textOutline: 'none',
                      fontWeight: 'normal'
                  }
              }
          }
      },
      series
    };
  }

  onBubbleClick(event: any): void {
    const point = event.point;
    console.log(`Clicked: ${point.name} (${point.series.name}) - Value: ${point.value}`);
  }
}