import { Component } from '@angular/core';
import {
  HighchartsChartDirective,
  providePartialHighcharts,
} from 'highcharts-angular';
import { DataService } from '../../services/data.service';
import { SentinelButtonWithIconComponent } from '@sentinel/components/button-with-icon';
import { Router } from '@angular/router';
import { SUBNETS_PATH } from '../../paths';

@Component({
  templateUrl: './topology.component.html',
  styleUrls: ['./topology.component.scss'],
  imports: [HighchartsChartDirective, SentinelButtonWithIconComponent],
  providers: [
    providePartialHighcharts({
      modules: () => {
        return [
          import('highcharts/esm/highcharts-more'),
          import('highcharts/modules/boost'),
        ];
      },
      timeout: 900,
    }),
  ],
})
export class TopologyComponent {
  chartOptions: Highcharts.Options = this.buildChartOptions([]);
  drilledInto: string | null = null;
  private chartRef: Highcharts.Chart | null = null;
  private allSeries: {
    name: string;
    data: { name: string; value: number }[];
  }[] = [];

  constructor(
    private data: DataService,
    private router: Router,
  ) {
    this.data.getOrgUnits().subscribe((units) => {
      this.allSeries = units.map((unit) => ({
        name: unit.name,
        data: unit.subnets.map((subnet: { range: string }) => ({
          name: subnet.range,
          value: 32 - parseInt(subnet.range.split('/')[1]) || 1,
        })),
      }));
      this.chartOptions = this.buildChartOptions(this.allSeries);
    });
  }

  onChartInstance(chart: Highcharts.Chart): void {
    this.chartRef = chart;
  }

  drillBack(): void {
    if (!this.chartRef) return;
    this.drilledInto = null;
    this.chartRef.series.forEach((s) => s.setVisible(true, false));
    this.chartRef.redraw();
  }

  drillInto(seriesName: string): void {
    if (!this.chartRef) return;
    this.drilledInto = seriesName;
    this.chartRef.series.forEach((s) => {
      if (s.name === seriesName) {
        s.setVisible(true, false);
      } else {
        s.setVisible(false, false);
      }
    });
    this.chartRef.redraw();
  }

  navigateToSubnetDetail(subnetRange: string): void {
    this.router.navigate([SUBNETS_PATH, subnetRange]);
  }

  private buildChartOptions(
    series: { name: string; data: { name: string; value: number }[] }[],
  ): Highcharts.Options {
    return {
      chart: {
        type: 'packedbubble',
        height: '900px',
        animation: true,
      },
      boost: {
        useGPUTranslations: true,
        // Chart-level boost when there are more than 5 series in the chart
        seriesThreshold: 5,
      },
      title: {
        text: 'Network Topology',
        align: 'center',
      },
      tooltip: {
        pointFormat: '<b>{point.name}</b>',
      },
      //colors: ["#E4295F", "#324376", "#44BFEC", "#6d77b1"],
      credits: {
        enabled: false,
      },
      plotOptions: {
        packedbubble: {
          minSize: '55%',
          maxSize: '80%',
          layoutAlgorithm: {
            enableSimulation: false,
            gravitationalConstant: 0.05,
            splitSeries: true,
            seriesInteraction: false,
            dragBetweenSeries: false,
            parentNodeLimit: true,
          },
          cursor: 'pointer',
          point: {
            events: {
              click: (e: any) => {
                if (!this.drilledInto) {
                  this.drillInto(e.point.series.name);
                }
                if (e.point.value > 1) {
                  this.navigateToSubnetDetail(e.point.name);
                  console.log(
                    `Clicked on ${e.point.name} with value ${e.point.value}`,
                  );
                }
              },
            },
          },
          dataLabels: {
            enabled: true,
            format: '{point.name}',
            style: {
              color: 'black',
              textOutline: 'none',
              fontWeight: 'normal',
              fontSize: '10px',
            },
          },
        },
      },
      series: series.map((s) => ({
        name: s.name,
        data: s.data.map((d) => ({
          name: d.name,
          value: d.value,
        })),
      })) as any,
    };
  }
}
