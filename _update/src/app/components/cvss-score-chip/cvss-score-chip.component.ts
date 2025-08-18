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
  //label = computed(() => scoreToClassCVSS(this.score(), this.type()));
  label = input<string>('unknown');

  color = computed(() => {
    const severity = this.label();
    switch (severity) {
      case 'low':
        return '#f6d55c'; // '#f2cc0c', #f6d55c, #d4edda
      case 'medium':
        return '#ed913b'; // '#ec971f', #ed913b, #fff3cd
      case 'high':
        return '#d9534f'; // '#d9534f', #f44336, #f8d7da
      case 'critical':
        return '#1C1D21';
      default:
        return '#efefef';
    }
  });

  labelColor = computed(() => {
    return this.label() == 'critical' ? '#ffff': '#1C1D21';
  });
}