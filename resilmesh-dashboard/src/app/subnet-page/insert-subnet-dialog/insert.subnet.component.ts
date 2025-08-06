import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { ChangeDetectionStrategy, Component, computed, inject, input, model, OnInit, signal, Signal, WritableSignal } from "@angular/core";
import { MatChipInputEvent } from "@angular/material/chips";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { SubnetExtendedData } from "../../shared/models/subnet.model";
import { DataService } from "../../shared/services/data.service";
import { toSignal } from "@angular/core/rxjs-interop";


@Component({
  selector: 'insert-subnet-dialog',
  templateUrl: 'insert-subnet-dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class InsertSubnetDialog implements OnInit {
  readonly dialogRef = inject(MatDialogRef<InsertSubnetDialog>);

  data = inject(MAT_DIALOG_DATA) as { subnet: SubnetExtendedData, mode: 'insert' | 'edit' };
  
  title = computed(() => this.data.mode === 'insert' ? 'Insert Subnet' : 'Edit Subnet');
  
  allSubnets: Signal<SubnetExtendedData[]>;
  allOrgUnits: Signal<{ _id: string; name: string }[]>;
  range = signal(this.data.subnet.range || '');
  contacts: WritableSignal<string[]> = signal(this.data.subnet.contacts || []);  

  constructor(private dataService: DataService) {
    this.allSubnets = toSignal(this.dataService.getSubnets(), { initialValue: [] });
    this.allOrgUnits = toSignal(this.dataService.getOrgUnits(), { initialValue: [] });

    console.log('Input data:', this.data);
  }

  ngOnInit(): void {}

  insertSubnet() {
    const newSubnet = {
      range: this.range(),
      note: this.data.subnet.note,
      parentSubnet: this.data.subnet.parentSubnet,
      organizationUnit: this.data.subnet.organizationUnit,
      contacts: this.contacts(),
    };

    this.dataService.insertSubnet(newSubnet);
  }

  editSubnet() {
    console.log(`Updating subnet ${this.data.subnet.range} -> ${this.range()} | ${this.data.subnet.note}`);
    this.dataService.updateSubnet(this.data.subnet.range, this.range(), this.data.subnet.note);
  }
}