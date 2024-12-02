import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SentinelBreadcrumbsComponent } from './sentinel-breadcrumbs.component';
import { LayoutCommonComponentsMaterialModule } from '../../common-components/src/layout-common-components-material.module';
import { testDetectChanges } from '@sentinel/common/testing';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { SentinelPipesModule } from '@sentinel/common/pipes';

describe('BreadcrumbsComponent', () => {
  let component: SentinelBreadcrumbsComponent;
  let fixture: ComponentFixture<SentinelBreadcrumbsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [LayoutCommonComponentsMaterialModule, RouterTestingModule, CommonModule, SentinelPipesModule],
      declarations: [SentinelBreadcrumbsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentinelBreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be collapsed when overflowContainerWidth is too wide', fakeAsync(() => {
    component.breadcrumbs = [
      { label: 'Page A', url: '/user' },
      { label: 'Nested Page AB', url: '/user' },
      { label: 'Nested Page ABC', url: '' },
      { label: 'Nested Page ABCD', url: '' },
      { label: 'Nested Page ABCDE', url: '' },
    ];
    component.overflowContainerWidth = 800;
    testDetectChanges(fixture.changeDetectorRef, fixture);
    component.ngAfterViewInit();
    // Expect the ... button to be visible
    const card = fixture.debugElement.query(By.css('.sentinel-breadcrumb-overflow-button'));
    expect(card).toBeTruthy();
  }));
  it(
    'should be overflowing when width of breadcrumbs > width of parent container ' +
      'and overflowContainerWidth is not set yet',
    fakeAsync(() => {
      component.overflowContainerWidth = -1;
      component.checkOverflow(800, 500);
      testDetectChanges(fixture.changeDetectorRef, fixture);
      expect(component.overflowing).toBeTruthy();
    }),
  );
  it('should be overflowing when overflowContainerWidth is wider than width of breadcrumbs parent container ', fakeAsync(() => {
    component.overflowContainerWidth = 505;
    component.checkOverflow(500, 500);
    testDetectChanges(fixture.changeDetectorRef, fixture);
    expect(component.overflowing).toBeTruthy();
  }));
  it('should not be overflowing when overflowContainerWidth is smaller than width of breadcrumbs parent container ', fakeAsync(() => {
    component.overflowContainerWidth = 499;
    component.checkOverflow(499, 500);
    testDetectChanges(fixture.changeDetectorRef, fixture);
    expect(component.overflowing).toBeFalsy();
  }));
});
