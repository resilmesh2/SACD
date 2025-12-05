import { OverlayModule } from "@angular/cdk/overlay";
import { ChangeDetectionStrategy, Component, computed, input, model } from "@angular/core";
import { DataService } from "../../../services/data.service";

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
  type = input<string | undefined>(undefined);

  address = input<string | undefined>(undefined);
  serviceData = input<{ service: string; port: number; protocol: string } | undefined>(undefined);

  isEditOpen = model<boolean>(false);

  constructor(private data: DataService) {}

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

  updateStatus(status: string): void {
    switch (this.type()?.toLowerCase().trim()) {
      case 'ip':
        this.updateIPStatus(status);
        break;
      case 'networkservice':
        this.updateNetworkServiceStatus(status);
        break;
      default:
        console.error(`Unsupported asset type: ${this.type()}. Cannot update status.`);
    }
  }

  updateNetworkServiceStatus(status: string): void {
    if (this.address() && this.serviceData()) {
      this.label.set(status);
      this.data.changeNetworkServiceStatus(
        this.address() || '',
        this.serviceData()?.protocol || '',
        this.serviceData()?.port || 0,
        this.serviceData()?.service || '',
        status
      );
      this.isEditOpen.set(false);
      return;
    }
    
    console.error('Address, protocol, or port is undefined. Cannot update status.');
  }

  updateIPStatus(status: string): void {
    if (this.address()) {
      this.label.set(status);
      this.data.changeIPStatus(this.address() || '', status);
      this.isEditOpen.set(false);
      return;
    }

    console.error('Address is undefined. Cannot update status.');
  }
}