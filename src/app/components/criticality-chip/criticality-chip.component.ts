import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

// Buckets for normalized metrics (1..10). Final criticality uses the same buckets scaled by 10.
const THRESHOLDS = [9, 7, 5, 3, 1];

@Component({
  selector: 'criticality-chip',
  templateUrl: 'criticality-chip.component.html',
  styleUrl: 'criticality-chip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class CriticalityChipComponent {
  value = input<number | null | undefined>(null);
  scale = input<'normalized' | 'final'>('normalized');

  colors = computed<{ bg: string; color: string }>(() => {
    const value = this.value();
    if (value === null || value === undefined) return { bg: '#cacaca', color: '#000000' };

    const factor = this.scale() === 'final' ? 10 : 1;
    if (value >= THRESHOLDS[0] * factor) return { bg: '#1C1D21', color: '#FFFFFF' };
    if (value >= THRESHOLDS[1] * factor) return { bg: '#9F85FF', color: '#000000' };
    if (value >= THRESHOLDS[2] * factor) return { bg: '#ed625e', color: '#000000' };
    if (value >= THRESHOLDS[3] * factor) return { bg: '#ed913b', color: '#000000' };
    if (value > THRESHOLDS[4] * factor) return { bg: '#f6d55c', color: '#000000' };
    return { bg: '#86B46A', color: '#000000' };
  });
}
