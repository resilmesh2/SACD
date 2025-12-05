import { ChangeDetectionStrategy, Component, computed, input, model } from "@angular/core";

@Component({
  selector: 'status-chip',
  templateUrl: 'status-chip.component.html',
  styleUrl: 'status-chip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})

export class StatusChipComponent {
  label = model<string | undefined>('unknown');
  type = input<'asset' | 'vulnerability'>('asset');

  color = computed(() => {
    return this.type() === 'asset' ? this.assetColorByLabel() : this.vulnerabilityColorByLabel();
  });

  assetColorByLabel = computed(() => {
    switch (this.label()?.toLowerCase()) {
      case 'unknown':
        return '#ff7d88';
      case 'known':
        return '#86B46A';
      case 'rediscovered':
        return '#f6a542';
      default:
        return '#cacaca';
    }
  });

  vulnerabilityColorByLabel = computed(() => {
    switch (this.label()?.toLowerCase()) {
      case 'estimated':
        return '#A1D2CE';
      case 'confirmed':
        return '#ff7d88';
      case 'unconfirmed':
        return '#c9c5bd';
      case 'assessed':
        return '#f6a542';
      case 'reassessed':
        return '#f1c037';
      case 'resolved':
        return '#86B46A';
      case 'closed':
        return '#989898';
      default:
        return '#cacaca';
    }
  });

  labelColor = computed(() => {
    return this.label() == 'critical' ? '#ffff': '#1C1D21';
  });
}