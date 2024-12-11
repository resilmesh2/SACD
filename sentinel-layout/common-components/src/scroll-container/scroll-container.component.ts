import { Component, ElementRef, HostListener, Inject, ViewChild } from '@angular/core';
import { BaseDirective } from '@sentinel/layout/internal';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'sentinel-scroll-container',
  templateUrl: './scroll-container.component.html',
  styleUrls: ['./scroll-container.component.scss'],
})
export class ScrollContainerComponent extends BaseDirective {
  @ViewChild('scrollContent', { static: true }) scrollContent?: ElementRef;
  showScrollDown = false;
  showScrollUp = false;
  scrollDownBelowToolbar = true;

  @HostListener('window:scroll') onWindowScroll(): void {
    this.onScroll();
  }

  constructor(@Inject(DOCUMENT) private document: Document) {
    super();
  }

  clear(): void {
    this.showScrollDown = false;
    this.showScrollUp = false;
  }

  /**
   * Scroll to bottom of the page.
   */
  scrollToBottom(): void {
    if (this.scrollContent) {
      this.scrollTo(this.scrollContent.nativeElement, 'end');
    }
  }

  /**
   * Scroll to top of the page.
   */
  scrollToTop(): void {
    if (this.scrollContent) {
      this.scrollTo(this.scrollContent.nativeElement, 'start');
    }
  }

  /**
   * Enable or disable scrolling buttons.
   */
  private onScroll() {
    const window = this.document.defaultView;
    const scrollTop = this.document.documentElement.scrollTop || this.document.body.scrollTop;
    const clientHeight =
      window?.innerHeight || this.document.documentElement.clientHeight || this.document.body.clientHeight;
    const scrollHeight = this.document.documentElement.scrollHeight || this.document.body.scrollHeight;

    this.scrollDownBelowToolbar = scrollTop < 100;
    this.showScrollDown = scrollHeight - scrollTop - clientHeight > 50;
    this.showScrollUp = scrollTop > 50;
  }

  /**
   * Scroll to the given position.
   * @param element HTML element
   * @param position position
   */
  private scrollTo(element: Element, position: ScrollLogicalPosition): void {
    element.scrollIntoView({ behavior: 'smooth', block: position });
  }
}
