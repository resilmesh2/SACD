import { ChangeDetectionStrategy, Component, computed, contentChild, input, TrackByFunction } from '@angular/core';
import { NgTemplateOutlet, SlicePipe } from '@angular/common';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { trackByIndex } from '@sentinel/common/utils';
import { InlineElementDirective } from './inline-element.directive';

/**
 * Renders the first `maxDisplayedElements` elements inline, followed by an "and N more..." trigger.
 * When `tooltipTransformFn` is provided it is also used to render inline items lacking an `*inlineElement`
 * template, and the trigger opens a menu listing the remaining elements
 * (or, if the remaining names are shorter than the "and N more..." text, prints them inline instead).
 *
 * `elementsTotalCount` may exceed `elements.length` when the caller only fetched a page of items;
 * the difference is shown as an extra "and N more..." row inside the menu.
 */
@Component({
  selector: 'inline-elements-preview',
  imports: [SlicePipe, NgTemplateOutlet, MatMenu, MatMenuTrigger],
  templateUrl: './inline-elements-preview.component.html',
  styleUrl: './inline-elements-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class InlineElementsPreviewComponent<T> {
  readonly elements = input.required<T[] | undefined | null>();
  readonly elementsTotalCount = input.required<number>();
  readonly elementTypeName = input<string>('elements');
  readonly maxDisplayedElements = input<number>(4);
  readonly trackByFn = input<TrackByFunction<T>>(trackByIndex);
  readonly elementViewDirective = contentChild(InlineElementDirective);
  readonly isTableCell = input<boolean>(false);
  readonly tooltipTransformFn = input<((element: T) => string) | undefined>(undefined);

  // maxDisplayedElements = 0 means nothing is shown inline; the trigger becomes a plain element count
  readonly defaultAndMoreText = computed(() =>
    this.maxDisplayedElements() === 0
      ? `${this.elementsTotalCount()} ${this.elementTypeName()}`
      : `and ${this.elementsTotalCount() - this.maxDisplayedElements()} more...`,
  );

  readonly extraItemsCount = computed(() => this.elementsTotalCount() - (this.elements()?.length ?? 0));

  readonly remainingElements = computed(() => {
    const elements = this.elements();
    const transformFn = this.tooltipTransformFn();

    if (!elements || !transformFn) {
      return [];
    }

    return elements.slice(this.maxDisplayedElements()).map((element) => transformFn(element));
  });

  // Whether the default 'and n more...' text is shorter than the combined length of the undisplayed elements
  readonly isAndMoreTextShorter = computed(() => {
    if (this.maxDisplayedElements() === 0 || this.remainingElements().length === 0) {
      return true;
    }

    const defaultCharCount = this.defaultAndMoreText().length;
    const undisplayedCharCount = this.remainingElements().reduce((acc, element) => acc + element.length, 0);

    return undisplayedCharCount > defaultCharCount;
  });

  // Either 'and n more...' or the remaining element(s) joined, whichever is shorter
  readonly andMore = computed(() =>
    this.isAndMoreTextShorter() ? this.defaultAndMoreText() : this.remainingElements().join(', '),
  );
}
