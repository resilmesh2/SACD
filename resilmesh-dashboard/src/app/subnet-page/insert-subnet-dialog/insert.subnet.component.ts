import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { ChangeDetectionStrategy, Component, inject, model, OnInit, signal, Signal, WritableSignal } from "@angular/core";
import { MatChipInputEvent } from "@angular/material/chips";
import { MatDialogRef } from "@angular/material/dialog";
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

  subnetRange: string = '';
  subnetNote: string = '';
  organizationUnit?: string;
  parentSubnet?: SubnetExtendedData;
  allSubnets: Signal<SubnetExtendedData[]>;
  allOrgUnits: Signal<{ _id: string; name: string }[]>;
  contacts: WritableSignal<string[]> = signal(['example@example.com']);

  constructor(private data: DataService) {
    this.allSubnets = toSignal(this.data.getSubnets(), { initialValue: [] });
    this.allOrgUnits = toSignal(this.data.getOrgUnits(), { initialValue: [] });
  }

  ngOnInit(): void {}

  insertSubnet() {
    const newSubnet = {
      range: this.subnetRange,
      note: this.subnetNote,
      parentSubnet: this.parentSubnet?.range,
      orgUnit: this.organizationUnit,
      contacts: this.contacts(),
    };

    this.data.insertSubnet(newSubnet);
  }
}