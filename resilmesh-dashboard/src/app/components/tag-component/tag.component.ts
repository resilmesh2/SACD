import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ENTER } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, computed, inject, Input, model, signal } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'tag-component',
  templateUrl: 'tag-component.html',
  styleUrl: 'tag-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagComponent {
  readonly separatorKeysCodes: number[] = [ENTER];
  readonly currentTag = model('');
  readonly tags = signal<string[]>([]);
  readonly tagsCache = signal<string[]>([]);
  readonly editOn = signal<boolean>(false);
  readonly filteredTags = computed(() => {
    const currentTag = this.currentTag().toLowerCase();
    return currentTag
      ? this.allTags.filter(tag => tag.toLowerCase().includes(currentTag))
      : this.allTags.slice();
  });

  @Input() inputTags: string[] = [];
  @Input() allTags: string[] = [];
  @Input() onSubmit: (id: string, tags: string[]) => void = () => null;
  @Input() id: string = "";

  readonly announcer = inject(LiveAnnouncer);

  ngOnInit(): void {
    this.tags.set(this.inputTags);
    this.tagsCache.set([...this.inputTags]);
  }


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value && !this.tags().includes(value)) {
      this.tags.update(tags => [...tags, value]);
    }

    event.chipInput!.clear();
    this.currentTag.set('');
  }

  remove(tag: string): void {
    this.tags.update(tags => {
      const index = tags.indexOf(tag);
      if (index < 0) {
        return tags;
      }

      tags.splice(index, 1);
      this.announcer.announce(`Removed ${tag}`);
      return [...tags];
    });
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (!this.tags().includes(event.option.viewValue)) {
      this.tags.update(tags => [...tags, event.option.viewValue]);
    }
    this.currentTag.set('');
    event.option.deselect();
  }

  changeEditStatus(): void {
    if (this.editOn()) {
      this.tagsCache.set([...this.tags()]);
    }
    this.editOn.update(editStatus => !editStatus)
  }

  saveChanges(): void {
    this.changeEditStatus();
    this.onSubmit(this.id, this.tags())
  }
  
  discardChanges(): void {
    this.tags.set(this.tagsCache());
    this.changeEditStatus();
  }
}