import { Component } from '@angular/core';
import { HighchartsChartDirective, providePartialHighcharts } from 'highcharts-angular';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { SUBNETS_PATH } from '../../paths';
import { OrgUnitData } from '../../models/org-unit.model';
import { uniqueId } from 'lodash';

@Component({
  templateUrl: './treemap.component.html',
  styleUrls: ['./treemap.component.scss'],
  imports: [HighchartsChartDirective],
    providers: [
      providePartialHighcharts({
        modules: () => {
          return [
            import('highcharts/esm/modules/treemap'),
            import('highcharts/esm/modules/stock')
          ];
        },
        timeout: 900,
      }),
    ],
})
export class TreemapComponent {
  chartOptions: Highcharts.Options = this.buildChartOptions([]);
  drilledInto: string | null = null;
  private orgData: { id?: string; name: string; value?: number; parent?: string }[] = [];

  

  constructor(private data: DataService, private router: Router) {
    this.data.getOrgUnits().subscribe(units => {
      this.orgData = this.convertOrgUnitsToTreemapData(units);
      this.chartOptions = this.buildChartOptions(this.orgData);
    });
  }

  convertOrgUnitsToTreemapData(orgUnits: OrgUnitData[]) {
    const data: { id?: string; name: string; value?: number; parent?: string }[] = [];
    console.log(orgUnits);

    for (const unit of orgUnits) {
      data.push({ id: unit.name, name: unit.name, parent: unit.parentOrgUnit == '---' || !unit.parentOrgUnit ? undefined : unit.parentOrgUnit, value: 32 });

      // Find subnet ranges that are referenced as parents
      const parentRanges = new Set(
        unit.subnets
          .filter(s => s.parent)
          .map(s => s.parent)
      );

      // Add parent subnet nodes that aren't in the subnet list themselves
      const subnetRanges = new Set(unit.subnets.map(s => s.range));
      for (const range of parentRanges) {
        if (range && !subnetRanges.has(range)) {
          data.push({ id: range, name: range, parent: unit.name });
        }
      }

      for (const subnet of unit.subnets) {
        const prefix = parseInt(subnet.range.split('/')[1]);
        const value = 32 - prefix || 1;
        const node: { id?: string; name: string; value: number; parent: string } = {
          name: subnet.range,
          value,
          parent: subnet.parent ? subnet.parent : unit.name,
        };

        // If this subnet is a parent to others, give it an id so children can reference it
        if (parentRanges.has(subnet.range)) {
          node.id = subnet.range;
        }

        data.push(node);
      }
    }

    console.log(data);

    return data;
  }

  navigateToSubnetDetail(subnetRange: string): void {
      this.router.navigate([SUBNETS_PATH, subnetRange]);
  }

  private buildChartOptions(
    orgData: { id?: string; name: string; value?: number; parent?: string }[]
  ): Highcharts.Options {
      return  {
        chart: {
          height: "900px"
        },
        credits: {
          enabled: false
        },
        series: [{
            type: 'treemap',
            name: 'All Units',
            allowTraversingTree: true,
            alternateStartingDirection: true,
            dataLabels: {
                format: '{point.name}',
                style: {
                    textOutline: 'none'
                }
            },
            point: {
              events: {
                click: (e: any) => {
                  if (e.point.node.childrenTotal == 0) {
                    this.navigateToSubnetDetail(e.point.name);
                  }
                },
              },
            },
            borderRadius: 3,
            nodeSizeBy: 'leaf',
            levels: [
              {
                level: 1,
                layoutAlgorithm: 'sliceAndDice',
                dataLabels: {
                    headers: true,
                    enabled: true,
                    style: {
                        fontSize: '0.6em',
                        fontWeight: 'normal',
                        textTransform: 'uppercase',
                        color: 'var(--highcharts-neutral-color-100, #000)'
                    }
                },
                borderWidth: 1,
                color: "#343F5D40"
            }, 
            {
                level: 2,
                layoutAlgorithm: 'squarified',
                dataLabels: {
                    headers: true,
                    enabled: true,
                    inside: false
                },
                color: "#343F5D"
            },
            {
                level: 3,
                layoutAlgorithm: 'strip',
                dataLabels: {
                    headers: true,
                    enabled: true,
                    inside: false
                },
                color: "#44BFEC"
            },
            {
              level: 4,
              layoutAlgorithm: 'sliceAndDice',
              dataLabels: {
                  headers: true,
                  enabled: true,
                  inside: false
              },
              color: "#E4295F"
            }
          ],
          data: orgData
        }],
        title: {
            text: 'Organisation units & subnets',
            align: 'left'
        },
        // subtitle: {
        //     text:
        //         'Source: <a href="https://snl.no/Norge" target="_blank">SNL</a>',
        //     align: 'left'
        // },
        tooltip: {
          enabled: false
        }
        // tooltip: {
        //     pointFormat: 'Size of <b>{point.name}</b> is \
        //         <b>{point.value}</b>'
        // }
    }}
}
