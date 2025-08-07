import { ChangeDetectionStrategy, Component, computed, inject, input, model, OnInit, Output, output, OutputEmitterRef, signal, Signal, WritableSignal } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { SubnetExtendedData } from "../../../models/subnet.model";
import { toSignal } from "@angular/core/rxjs-interop";
import { DataService } from "../../../services/data.service";
import { ChipsContacts } from "./chips-contacts/chips-contacts.component";
import { MatLabel, MatOption, MatSelectModule } from "@angular/material/select";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButton } from "@angular/material/button";

@Component({
  selector: 'insert-subnet-dialog',
  templateUrl: 'insert-subnet-dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatDialogModule,
    ChipsContacts,
    MatOption,
    MatSelectModule,
    MatLabel,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButton
  ],
})

export class InsertSubnetDialog implements OnInit {
  readonly dialogRef = inject(MatDialogRef<InsertSubnetDialog>);

  data = inject(MAT_DIALOG_DATA) as { subnet: SubnetExtendedData, mode: 'insert' | 'edit' };
  
  title = computed(() => this.data.mode === 'insert' ? 'Insert Subnet' : 'Edit Subnet');
  
  allSubnets: Signal<SubnetExtendedData[]>;
  allOrgUnits: Signal<{ _id: string; name: string }[]>;

  updateSubnetDataSource = output<{ oldRange: string; subnet: SubnetExtendedData }>();

  range = signal(this.data.subnet.range || '');
  note = signal(this.data.subnet.note || '');
  contacts = signal(this.data.subnet.contacts || []);
  parentSubnet = signal(this.data.subnet.parentSubnet || null);
  orgUnit = signal(this.data.subnet.organizationUnit || null);

  constructor(private dataService: DataService) {
    this.allSubnets = toSignal(this.dataService.getSubnets(), { initialValue: [] });
    this.allOrgUnits = toSignal(this.dataService.getOrgUnits(), { initialValue: [] });
  }

  ngOnInit(): void {}

  updatedSubnet = computed(() => ({
    ...this.data.subnet,
    range: this.range(),
    note: this.note(),
    parentSubnet: this.parentSubnet(),
    organizationUnit: this.orgUnit(),
    contacts: this.contacts(),
  }));

  insertSubnet() {
    this.dataService.insertSubnet(this.updatedSubnet());

    this.updateSubnetDataSource.emit({
      oldRange: this.data.subnet.range,
      subnet: this.updatedSubnet()
    });
  }

  editSubnet() {
    console.log(`Updating subnet ${this.data.subnet.range} -> ${this.range()} | ${this.data.subnet.note}`);
    this.dataService.editSubnet(this.data.subnet, this.updatedSubnet());

    this.updateSubnetDataSource.emit({ 
      oldRange: this.data.subnet.range,
      subnet: this.updatedSubnet()
    });
  }
  
}