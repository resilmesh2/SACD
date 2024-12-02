import { ComponentPortal, ComponentType, Portal, TemplatePortal } from '@angular/cdk/portal';
import { Injectable, TemplateRef, ViewContainerRef } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContextSidebarService {
  sidebar?: MatDrawer;
  private viewContainerRef?: ViewContainerRef;
  private panelPortalSubject$: BehaviorSubject<Portal<unknown> | null> = new BehaviorSubject<Portal<unknown> | null>(
    null,
  );
  private templateRefWaitingForVcrInit?: TemplateRef<unknown>;

  panelPortal$: Observable<Portal<unknown> | null> = this.panelPortalSubject$.asObservable();

  /** Sets the view container ref needed for {@link #setPanelContent}. */
  setViewContainerRef(vcr: ViewContainerRef): void {
    this.viewContainerRef = vcr;
    if (this.templateRefWaitingForVcrInit) {
      this.panelPortalSubject$.next(new TemplatePortal(this.templateRefWaitingForVcrInit, this.viewContainerRef));
      this.templateRefWaitingForVcrInit = undefined;
    }
  }

  /** Sets the panel portal to the specified portal. */
  setPanelPortal(panelPortal: Portal<unknown>): void {
    this.panelPortalSubject$.next(panelPortal);
  }

  /**
   * Sets the panel content.
   * @param componentOrTemplateRef The component/template reference used.
   */
  setPanelContent(componentOrTemplateRef: ComponentType<unknown> | TemplateRef<unknown>): void {
    if (componentOrTemplateRef instanceof TemplateRef) {
      if (this.viewContainerRef) {
        this.panelPortalSubject$.next(new TemplatePortal(componentOrTemplateRef, this.viewContainerRef));
      } else {
        this.templateRefWaitingForVcrInit = componentOrTemplateRef; // in cases where panel content is set before vcr initialization
      }
    } else {
      this.panelPortalSubject$.next(new ComponentPortal(componentOrTemplateRef));
    }
  }

  /** Resets the current panel portal. */
  clearPanelPortal(): void {
    this.sidebar?.close();
    this.panelPortalSubject$.next(null);
  }

  /** Opens the panel with optionally a portal to be set. */
  open(portal?: Portal<unknown>): void {
    if (portal) {
      this.panelPortalSubject$.next(portal);
    }
    this.sidebar?.open();
  }

  /** Toggles the panel. */
  toggle(): void {
    this.sidebar?.toggle();
  }

  /** Closes the panel. */
  close(): void {
    this.sidebar?.close();
  }
}
