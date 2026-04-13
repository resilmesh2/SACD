import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  model,
  OnInit,
  output,
  signal,
  WritableSignal,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { ChipsContacts } from '../../../components/chips-contacts/chips-contacts.component';
import { MatLabel, MatOption, MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { SentinelButtonWithIconComponent } from '@sentinel/components/button-with-icon';
import { GetAllOrgUnitsQuery } from '../../../graphql/org-units/org-units.operation.generated';
import {
  CreateOrgUnitMutationService,
  UpdateOrgUnitMutationService,
  LinkOrgUnitToParentMutationService,
  UnlinkOrgUnitFromParentsMutationService,
  MergeOrgUnitWithContactsMutationService,
  UnlinkOrgUnitFromContactsMutationService,
} from './org-unit-crud-dialog.operation.generated';

type OrgUnitRow = GetAllOrgUnitsQuery['organizationUnits'][0];

@Component({
  selector: 'org-unit-crud-dialog',
  templateUrl: 'org-unit-crud.html',
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
export class OrgUnitCrudDialog implements OnInit {
  readonly dialogRef = inject(MatDialogRef<OrgUnitCrudDialog>);

  data = inject(MAT_DIALOG_DATA) as {
    allOrgUnits: OrgUnitRow[];
    orgUnit: Partial<OrgUnitRow>;
    mode: 'insert' | 'edit';
  };

  title = computed(() => (this.data.mode === 'insert' ? 'Create Organization Unit' : 'Edit Organization Unit'));

  allOrgUnits: WritableSignal<OrgUnitRow[]> = model(this.data.allOrgUnits || []);

  updateOrgUnitDataSource = output<{ oldName: string; orgUnit: OrgUnitRow }>();

  name = signal(this.data.orgUnit.name || '');
  parentOrgUnit = signal<string | null>(this.data.orgUnit.parent_org_unit?.at(0)?.name ?? null);
  contacts = signal<string[]>(this.data.orgUnit.contacts?.map((c) => c.name) ?? []);

  private createOrgUnit = inject(CreateOrgUnitMutationService);
  private updateOrgUnit = inject(UpdateOrgUnitMutationService);
  private linkToParent = inject(LinkOrgUnitToParentMutationService);
  private unlinkFromParents = inject(UnlinkOrgUnitFromParentsMutationService);
  private mergeWithContacts = inject(MergeOrgUnitWithContactsMutationService);
  private unlinkFromContacts = inject(UnlinkOrgUnitFromContactsMutationService);

  ngOnInit(): void {}

  updatedOrgUnit = computed<OrgUnitRow>(() => ({
    name: this.name(),
    parent_org_unit: this.parentOrgUnit() ? [{ name: this.parentOrgUnit()! }] : [],
    contacts: this.contacts().map((name) => ({ name })),
    subnets: this.data.orgUnit.subnets ?? [],
  }));

  insertOrgUnit(): void {
    const name = this.name();
    const parentOrgUnit = this.parentOrgUnit();
    const contacts = this.contacts();

    this.createOrgUnit
      .mutate({ name })
      .pipe(
        switchMap(() => {
          const ops = [];
          if (parentOrgUnit)
            ops.push(this.linkToParent.mutate({ orgUnitName: name, parentOrgUnitName: parentOrgUnit }));
          if (contacts.length > 0)
            ops.push(this.mergeWithContacts.mutate({ orgUnitName: name, contactNames: contacts }));
          return ops.length > 0 ? forkJoin(ops) : of(null);
        }),
      )
      .subscribe({ error: (e) => console.error('Error inserting org unit:', e) });

    this.updateOrgUnitDataSource.emit({ oldName: '', orgUnit: this.updatedOrgUnit() });
    this.dialogRef.close();
  }

  editOrgUnit(): void {
    const oldName = this.data.orgUnit.name!;
    const newName = this.name();
    const oldContacts = this.data.orgUnit.contacts?.map((c) => c.name) ?? [];
    const newContacts = this.contacts();
    const newParent = this.parentOrgUnit();

    this.updateOrgUnit
      .mutate({ oldName, newName })
      .pipe(
        switchMap(() => {
          const ops = [];
          ops.push(this.unlinkFromParents.mutate({ orgUnitName: newName }));
          if (newParent && newName !== newParent) {
            ops.push(this.linkToParent.mutate({ orgUnitName: newName, parentOrgUnitName: newParent }));
          }
          if (oldContacts.length > 0)
            ops.push(this.unlinkFromContacts.mutate({ orgUnitName: newName, contactNames: oldContacts }));
          if (newContacts.length > 0)
            ops.push(this.mergeWithContacts.mutate({ orgUnitName: newName, contactNames: newContacts }));
          return ops.length > 0 ? forkJoin(ops) : of(null);
        }),
      )
      .subscribe({ error: (e) => console.error('Error editing org unit:', e) });

    this.updateOrgUnitDataSource.emit({ oldName, orgUnit: this.updatedOrgUnit() });
  }
}
