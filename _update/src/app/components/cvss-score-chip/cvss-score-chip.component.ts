import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core";

@Component({
  selector: 'cvss-score-chip',
  templateUrl: 'cvss-score-chip.component.html',
  styleUrl: 'cvss-score-chip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CvssScoreChipComponent {
  score = input<number | null>(null);
  type = input<2 | 3 | 4>(3); // 2 for CVSS v2, 3 for CVSS v3, 4 for CVSS v4
  tooltip = input<string>('CVSS Score');
  //label = computed(() => this.scoreClass(this.score(), this.type()));
  label = input<string>('unknown');

  color = computed(() => {
    const severity = this.label();
    switch (severity) {
      case 'low':
        return '#d4edda';
      case 'medium':
        return '#fff3cd';
      case 'high':
        return '#f8d7da';
      case 'critical':
        return '#1C1D21';
      default:
        return '#efefef';
    }
  });

  labelColor = computed(() => {
    return this.label() == 'critical' ? '#ffff': '#1C1D21';
  });

  scoreClass(value: number | null, type: number) {
    console.log('Calculating score class for value:', value, 'type:', type);
    if (value === null || value === undefined) {
        return 'unknown';
    }

    // if (typeof value == 'string') {
    //   value = ~~value; // Convert string to number
    // }

    if (type === 2) {
      if (value <= 3.9) {
        return 'low';
      }

      if (value > 3.9 && value <= 6.9) {
        return 'medium';
      }

      if (value > 6.9) {
        return 'high';
      }
    } else if (type === 3) {
      if (value > 8.9) {
        return 'critical';
      }

      if (value > 6.9) {
        return 'high';
      }

      if (value > 3.9 && value <= 6.9) {
        return 'medium';
      }

      if (value <= 3.9) {
        return 'low';
      }
    }
    return 'unknown';
  }
}