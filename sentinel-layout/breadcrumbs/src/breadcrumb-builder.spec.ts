import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SentinelBreadcrumbBuilder } from './sentinel-breadcrumb-builder';
import { LoadingComponent } from '../../common-components/src/loading/loading.component';

describe('BreadcrumbBuilder', () => {
  let router: Router;
  let activatedRoute: ActivatedRoute;
  let fixture: ComponentFixture<LoadingComponent>;
  const mockComponent = LoadingComponent;
  const routes: Routes = [
    {
      path: '',
      component: LoadingComponent,
    },
    {
      path: 'path1',
      component: LoadingComponent,
      data: { breadcrumb: 'First' },
      children: [
        {
          path: 'inner1',
          component: LoadingComponent,
          data: { breadcrumb: 'First inner' },
          children: [
            {
              path: 'deeper',
              component: LoadingComponent,
            },
          ],
        },
      ],
    },
    {
      path: 'path2',
      component: LoadingComponent,
      data: { breadcrumb: null },
    },
    {
      path: 'path3',
      component: LoadingComponent,
      data: { breadcrumb: undefined },
    },
    {
      path: 'path4',
      component: LoadingComponent,
      data: { breadcrumb: 'Same' },
      children: [
        {
          path: 'inner4',
          component: LoadingComponent,
          data: { breadcrumb: 'Same' },
        },
      ],
    },
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [mockComponent],
    })
      .overrideComponent(LoadingComponent, {
        set: {
          selector: 'sentinel-loading',
          template: '',
        },
      })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(LoadingComponent);
        router = TestBed.inject(Router);
        activatedRoute = TestBed.inject(ActivatedRoute);
        fixture.detectChanges();
        fixture?.ngZone?.run(() => {
          router.initialNavigation();
        });
      });
  }));

  it('should create no breadcrumbs on empty route', waitForAsync(() => {
    const breadrumbs = SentinelBreadcrumbBuilder.build(activatedRoute.snapshot, 'breadcrumb', false);
    expect(breadrumbs.length).toBe(0);
  }));

  it('should create home breadcrumbs on empty route', waitForAsync(() => {
    const breadrumbs = SentinelBreadcrumbBuilder.build(activatedRoute.snapshot);
    expect(breadrumbs.length).toBe(1);
    expect(breadrumbs[0].label).toBe('Home');
    expect(breadrumbs[0].url).toBe('/');
  }));

  it('should create one breadcrumbs on route containing breadcrumb', waitForAsync(() => {
    fixture?.ngZone?.run(() => {
      fixture.whenStable().then(() => {
        router.navigate(['path1']).then(() => {
          const breadrumbs = SentinelBreadcrumbBuilder.build(activatedRoute.snapshot, 'breadcrumb', false);
          expect(breadrumbs.length).toBe(1);
          expect(breadrumbs[0].label).toBe('First');
          expect(breadrumbs[0].url).toBe('/path1');
        });
      });
    });
  }));

  it('should create two breadcrumbs in correct order on route containing two breadcrumbs', waitForAsync(() => {
    fixture?.ngZone?.run(() => {
      fixture.whenStable().then(() => {
        router.navigate(['path1/inner1']).then(() => {
          const breadrumbs = SentinelBreadcrumbBuilder.build(activatedRoute.snapshot, 'breadcrumb', false);
          expect(breadrumbs.length).toBe(2);
          expect(breadrumbs[0].label).toBe('First');
          expect(breadrumbs[0].url).toBe('/path1');
          expect(breadrumbs[1].label).toBe('First inner');
          expect(breadrumbs[1].url).toBe('/path1/inner1');
        });
      });
    });
  }));

  it('should not create breadcrumb if breadcrumb is missing in data of the route', waitForAsync(() => {
    fixture?.ngZone?.run(() => {
      fixture.whenStable().then(() => {
        router.navigate(['path1/inner1/deeper']).then(() => {
          const breadrumbs = SentinelBreadcrumbBuilder.build(activatedRoute.snapshot, 'breadcrumb', false);
          expect(breadrumbs.length).toBe(2);
          expect(breadrumbs[0].label).toBe('First');
          expect(breadrumbs[0].url).toBe('/path1');
          expect(breadrumbs[1].label).toBe('First inner');
          expect(breadrumbs[1].url).toBe('/path1/inner1');
        });
      });
    });
  }));

  it('should not create breadcrumb if breadcrumb in data of the route is null', waitForAsync(() => {
    fixture?.ngZone?.run(() => {
      fixture.whenStable().then(() => {
        router.navigate(['path2']).then(() => {
          const breadrumbs = SentinelBreadcrumbBuilder.build(activatedRoute.snapshot, 'breadcrumb', false);
          expect(breadrumbs.length).toBe(0);
        });
      });
    });
  }));

  it('should not create breadcrumb if breadcrumb in data of the route is undefined', waitForAsync(() => {
    fixture?.ngZone?.run(() => {
      fixture.whenStable().then(() => {
        router.navigate(['path3']).then(() => {
          const breadrumbs = SentinelBreadcrumbBuilder.build(activatedRoute.snapshot, 'breadcrumb', false);
          expect(breadrumbs.length).toBe(0);
        });
      });
    });
  }));
});
