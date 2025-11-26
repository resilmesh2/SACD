import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core";

@Component({
  selector: 'asset-type-chip',
  templateUrl: 'asset-type-chip.component.html',
  styleUrl: 'asset-type-chip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})

export class AssetTypeChipComponent {
  label = input<string | undefined>('unknown');

  color = computed(() => {
    switch (this.label()?.toLowerCase()) {
      case 'ip':
        return '#99c1e0';
      case 'networkservice':
        return '#91d2c4';
      case 'domainname':
        return '#f6a542';
      default:
        return '#cacaca';
    }
  });

  labelColor = computed(() => {
    return this.label()?.toLowerCase() == 'critical' ? '#ffff': '#1C1D21';
  });
}