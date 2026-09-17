import { Directive, Input, TemplateRef } from '@angular/core';
import { Optional } from '@sentinel/common/utils';

/**
 * Structural directive used to pass a custom element template into `inline-elements-preview`:
 *
 * <inline-elements-preview [elements]="items" [elementsTotalCount]="items.length">
 *   <ng-container *inlineElement="itemTemplate" />
 *   <ng-template #itemTemplate let-item>{{ item.name }}</ng-template>
 * </inline-elements-preview>
 */
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[inlineElement]',
  standalone: true,
})
export class InlineElementDirective {
  private _template?: TemplateRef<unknown>;

  @Input({ required: true })
  set inlineElement(templateRef: TemplateRef<unknown>) {
    this._template = templateRef;
  }

  get template(): Optional<TemplateRef<unknown>> {
    return this._template;
  }
}
