import { Directive, Input, OnDestroy, TemplateRef } from '@angular/core';
import { ContextSidebarService } from './context-sidebar.service';

@Directive({
  selector: '[sentinelContextSidebarTemplate]',
})
export class ContextSidebarContentDirective implements OnDestroy {
  private _template?: TemplateRef<unknown>;

  constructor(private sidebarService: ContextSidebarService) {}

  @Input()
  set sentinelContextSidebarTemplate(templateRef: TemplateRef<unknown>) {
    this._template = templateRef;
    this.sidebarService.setPanelContent(templateRef);
  }

  get template(): TemplateRef<unknown> | undefined {
    return this._template;
  }

  ngOnDestroy(): void {
    this.sidebarService.clearPanelPortal();
  }
}
