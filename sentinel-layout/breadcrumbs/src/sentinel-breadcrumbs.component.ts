import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  ViewChild,
} from '@angular/core';
import { SentinelBreadcrumb } from './breadcrumb';

/**
 * Presentational component displaying the breadcrumbs
 */
@Component({
  selector: 'sentinel-breadcrumbs',
  templateUrl: './sentinel-breadcrumbs.component.html',
  styleUrls: ['./sentinel-breadcrumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SentinelBreadcrumbsComponent implements AfterViewInit, OnChanges {
  @Input() breadcrumbs: SentinelBreadcrumb[] = [];
  @Input() maxLength = 45;
  @Input() divider?: string;
  overflowing = false;
  @ViewChild('container', { static: false }) container?: ElementRef;
  constructor(private cdr: ChangeDetectorRef) {}
  overflowContainerWidth = -1;

  ngAfterViewInit() {
    this.onCheckOverflow();
    this.cdr.detectChanges();
  }
  @HostListener('window:resize')
  onResize(): void {
    this.onCheckOverflow();
  }
  ngOnChanges() {
    this.onCheckOverflow();
  }
  // overflowContainerWidth is used for remembering the width of the breadcrumbs before it overflows in the initial View Init.
  // This is important because otherwise it would check the width of the overflown breadcrumbs Page A > ... Page ABCD
  // and not the breadcrumbs themselves
  countBreadcrumbsWidth() {
    if (this.container) {
      const breadcrumbsContainer = this.container.nativeElement;
      let countWidthBreadcrumbs = 0;
      for (const breadcrumb of breadcrumbsContainer.children) {
        countWidthBreadcrumbs += breadcrumb.offsetWidth;
      }
      return [countWidthBreadcrumbs, breadcrumbsContainer.parentElement.offsetWidth];
    }
    return [-1, 0];
  }

  // overflowContainerWidth is used for remembering the width of the breadcrumbs before it overflows in the initial View Init.
  // This is important because otherwise it would check the width of the overflown breadcrumbs Page A > ... Page ABCD
  // and not the breadcrumbs themselves
  checkOverflow(breadcrumbChild: number, breadcrumbParent: number) {
    if (this.overflowContainerWidth === -1 || this.overflowContainerWidth < breadcrumbChild) {
      this.overflowContainerWidth = breadcrumbChild;
    }
    this.overflowing = this.overflowContainerWidth > breadcrumbParent;
  }
  onCheckOverflow() {
    const [breadcrumbChild, breadcrumbParent] = this.countBreadcrumbsWidth();
    this.checkOverflow(breadcrumbChild, breadcrumbParent);
  }
}
