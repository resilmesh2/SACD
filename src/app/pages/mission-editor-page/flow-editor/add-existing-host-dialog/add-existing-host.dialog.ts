import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: 'add-existing-host-dialog',
  templateUrl: 'add-existing-host.dialog.html',
  imports: [
    MatDialogContent, 
    MatDialogActions, 
    MatDialogClose, 
    MatDialogTitle, 
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddExistingHostDialog {
  existingHostControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];

  ngOnInit() {
    this.existingHostControl.valueChanges.subscribe(value => {
      console.log('Selected host:', value);
    });
  }
}