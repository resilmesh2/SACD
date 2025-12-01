import { OverlayModule } from "@angular/cdk/overlay";
import { ChangeDetectionStrategy, Component, computed, model } from "@angular/core";

@Component({
  selector: 'asset-status-edit-chip',
  templateUrl: 'asset-status-edit-chip.component.html',
  styleUrl: 'asset-status-edit-chip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    OverlayModule,
  ],
  standalone: true
})

export class AssetStatusEditChipComponent {
  label = model<string | undefined>('unknown');
  isEditOpen = model<boolean>(false);

  color = computed(() => {
    return this.labelColorConverter(this.label() || 'unknown');
  });

  labelColorConverter = (label: string) => {
    switch (label.toLowerCase()) {
      case 'unknown':
        return '#ff7d88';
      case 'known':
        return '#86B46A';
      case 'rediscovered':
        return '#f6a542';
      default:
        return '#cacaca';
    }
  }

  labelColor = computed(() => {
    return this.label() == 'critical' ? '#ffff': '#1C1D21';
  });
}