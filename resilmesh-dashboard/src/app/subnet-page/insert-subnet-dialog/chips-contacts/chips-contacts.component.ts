import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { ChangeDetectionStrategy, Component, model } from "@angular/core";
import { MatChipInputEvent } from "@angular/material/chips";

@Component({
  selector: 'chips-contacts',
  templateUrl: 'chips-contacts.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ChipsContacts {
  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly contacts = model<string[]>([]);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add new contact
    if (value) {
      this.contacts.update(contacts => [...contacts, value]);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(contact: any): void {
    this.contacts.update(contacts => {
      const index = contacts.indexOf(contact);
      if (index < 0) {
        return contacts;
      }

      contacts.splice(index, 1);
      return [...contacts];
    });
  }
}