import { ChangeDetectionStrategy, Component, computed, inject, output, signal, Signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { ChipsContacts } from '../../../components/chips-contacts/chips-contacts.component';
import { MatLabel, MatOption, MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { SentinelButtonWithIconComponent } from '@sentinel/components/button-with-icon';
import { GetAllSubnetsQuery, GetAllSubnetsQueryService } from '../../../graphql/subnets/subnets.operation.generated';
import { GetAllOrgUnitsQueryService } from '../../../graphql/org-units/org-units.operation.generated';
import {
  CreateSubnetMutationService,
  UpdateSubnetMutationService,
  LinkSubnetToParentMutationService,
  UnlinkSubnetFromParentMutationService,
  LinkSubnetToOrgUnitMutationService,
  UnlinkSubnetFromOrgUnitMutationService,
  MergeSubnetWithContactsMutationService,
  UnlinkSubnetFromContactsMutationService,
} from './insert-subnet-dialog.operation.generated';

type SubnetRow = GetAllSubnetsQuery['subnets'][0];

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
    MatButton,
    SentinelButtonWithIconComponent,
  ],
})
export class InsertSubnetDialog {
  readonly dialogRef = inject(MatDialogRef<InsertSubnetDialog>);

  data = inject(MAT_DIALOG_DATA) as {
    subnet: Partial<SubnetRow>;
    mode: 'insert' | 'edit';
  };

  title = computed(() => (this.data.mode === 'insert' ? 'Insert Subnet' : 'Edit Subnet'));

  allSubnets: Signal<SubnetRow[]>;
  allOrgUnits: Signal<{ name: string }[]>;

  updateSubnetDataSource = output<{ oldRange: string; subnet: SubnetRow }>();

  range = signal(this.data.subnet.range || '');
  note = signal(this.data.subnet.note || '');
  contacts = signal<string[]>(this.data.subnet.contacts?.map((c) => c.name) ?? []);
  parentSubnet = signal<string | null>(this.data.subnet.parent_subnet?.at(0)?.range ?? null);
  orgUnit = signal<string | null>(this.data.subnet.org_units?.at(0)?.name ?? null);

  private getAllSubnets = inject(GetAllSubnetsQueryService);
  private getAllOrgUnits = inject(GetAllOrgUnitsQueryService);
  private createSubnet = inject(CreateSubnetMutationService);
  private updateSubnet = inject(UpdateSubnetMutationService);
  private linkToParent = inject(LinkSubnetToParentMutationService);
  private unlinkFromParent = inject(UnlinkSubnetFromParentMutationService);
  private linkToOrgUnit = inject(LinkSubnetToOrgUnitMutationService);
  private unlinkFromOrgUnit = inject(UnlinkSubnetFromOrgUnitMutationService);
  private mergeWithContacts = inject(MergeSubnetWithContactsMutationService);
  private unlinkFromContacts = inject(UnlinkSubnetFromContactsMutationService);

  constructor() {
    this.allSubnets = toSignal(
      this.getAllSubnets.fetch({}, { fetchPolicy: 'network-only' }).pipe(map((r) => r.data.subnets)),
      { initialValue: [] },
    );
    this.allOrgUnits = toSignal(
      this.getAllOrgUnits.fetch({}, { fetchPolicy: 'network-only' }).pipe(map((r) => r.data.organizationUnits)),
      { initialValue: [] },
    );
  }

  updatedSubnet = computed<SubnetRow>(() => ({
    _id: this.data.subnet._id ?? '',
    range: this.range(),
    note: this.note() || null,
    org_units: this.orgUnit() ? [{ name: this.orgUnit()! }] : [],
    contacts: this.contacts().map((name) => ({ name })),
    parent_subnet: this.parentSubnet() ? [{ _id: '', note: null, range: this.parentSubnet()! }] : [],
  }));

  insertSubnet(): void {
    const range = this.range();
    const parentSubnet = this.parentSubnet();
    const orgUnit = this.orgUnit();
    const contacts = this.contacts();

    this.createSubnet
      .mutate({ range, note: this.note() || null })
      .pipe(
        switchMap(() => {
          const ops = [];
          if (parentSubnet) {
            ops.push(this.linkToParent.mutate({ subnetRange: range, parentSubnetRange: parentSubnet }));
          }
          if (orgUnit) {
            ops.push(this.linkToOrgUnit.mutate({ subnetRange: range, orgUnitName: orgUnit }));
          }
          if (contacts.length > 0) {
            ops.push(this.mergeWithContacts.mutate({ subnetRange: range, contactNames: contacts }));
          }
          return ops.length > 0 ? forkJoin(ops) : of(null);
        }),
      )
      .subscribe({
        next: () => {
          this.updateSubnetDataSource.emit({ oldRange: '', subnet: this.updatedSubnet() });
          this.dialogRef.close();
        },
        error: (e) => console.error('Error inserting subnet:', e),
      });
  }

  editSubnet(): void {
    const oldRange = this.data.subnet.range!;
    const newRange = this.range();
    const oldParent = this.data.subnet.parent_subnet?.at(0)?.range ?? null;
    const newParent = this.parentSubnet();
    const oldOrgUnit = this.data.subnet.org_units?.at(0)?.name ?? null;
    const newOrgUnit = this.orgUnit();
    const oldContacts = this.data.subnet.contacts?.map((c) => c.name) ?? [];
    const newContacts = this.contacts();

    this.updateSubnet
      .mutate({ oldRange, newRange, note: this.note() || null })
      .pipe(
        switchMap(() => {
          const ops = [];
          if (oldParent) {
            ops.push(this.unlinkFromParent.mutate({ subnetRange: newRange, parentRange: oldParent }));
          }
          if (newParent && newRange !== newParent) {
            ops.push(this.linkToParent.mutate({ subnetRange: newRange, parentSubnetRange: newParent }));
          }
          if (oldOrgUnit) {
            ops.push(this.unlinkFromOrgUnit.mutate({ subnetRange: newRange, orgUnitName: oldOrgUnit }));
          }
          if (newOrgUnit) {
            ops.push(this.linkToOrgUnit.mutate({ subnetRange: newRange, orgUnitName: newOrgUnit }));
          }
          if (oldContacts.length > 0) {
            ops.push(this.unlinkFromContacts.mutate({ subnetRange: newRange, contactNames: oldContacts }));
          }
          if (newContacts.length > 0) {
            ops.push(this.mergeWithContacts.mutate({ subnetRange: newRange, contactNames: newContacts }));
          }
          return ops.length > 0 ? forkJoin(ops) : of(null);
        }),
      )
      .subscribe({
        next: () => {
          this.updateSubnetDataSource.emit({ oldRange, subnet: this.updatedSubnet() });
          this.dialogRef.close();
        },
        error: (e) => console.error('Error editing subnet:', e),
      });
  }
}
