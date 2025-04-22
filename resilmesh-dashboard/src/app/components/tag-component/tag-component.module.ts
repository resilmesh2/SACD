import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
import { TagComponent } from './tag.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [TagComponent],
  imports: [CommonModule, MatFormFieldModule, MatChipsModule, MatIconModule, MatAutocompleteModule, FormsModule, MatTooltipModule],
  exports: [TagComponent],

})
export class TagComponentModule {}
