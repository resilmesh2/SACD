import { ActivatedRouteSnapshot, Data, PRIMARY_OUTLET } from '@angular/router';
import { SentinelBreadcrumb } from './breadcrumb';
import { Optional } from '@sentinel/common/utils';

/**
 * @dynamic
 *  Creates and displays breadcrumbs from static or dynamic (resolve) route data.
 *  Breadcrumb data must be of type string.
 *  Two sequential breadcrumbs with same labels are ignored
 *  Ignores all non-primary router outlets
 *
 *  EXAMPLE OF STATIC DATA:
 *  {
 *   path:
 *   loadChildren:
 *   data: { breadcrumb: 'Home' }
 *  },
 *
 * EXAMPLE OF DYNAMIC DATA:
 *  {
 *   path:
 *   loadChildren:
 *   resolve: { breadcrumb: MyBreadcrumbResolver }
 *  },
 */
export class SentinelBreadcrumbBuilder {
  private static selector = 'breadcrumb';

  /**
   * Builds ordered list of breadcrumbs from data retrieved from router's activated route
   * @param activeRoute router active route
   * @param selector optional, name of the attribute provided in Angular Route Data storing
   * the name of the breadcrumb. 'breadcrumb' is used if not provided
   * @param startWithHome if true add Home breadcrumb which navigates to root url at the
   * start of the breadcrumbs array
   */
  static build(
    activeRoute: ActivatedRouteSnapshot,
    selector = 'breadcrumb',
    startWithHome = true,
  ): SentinelBreadcrumb[] {
    this.selector = selector;
    const breadcrumbs: SentinelBreadcrumb[] = [];
    if (startWithHome) {
      breadcrumbs.push(new SentinelBreadcrumb('Home', '/'));
    }
    let currentRoute = activeRoute.root;
    let currentUrl = '';
    while (this.hasChildren(currentRoute)) {
      currentRoute.children.forEach((route) => {
        currentRoute = route;
        currentUrl += `/${this.createSegmentUrl(currentRoute)}`;
        const breadcrumb = this.createBreadcrumb(currentRoute, currentUrl);
        if (breadcrumb && this.isDistinctFromLastOne(breadcrumb, breadcrumbs)) {
          breadcrumbs.push(breadcrumb);
        }
      });
    }
    return breadcrumbs;
  }

  private static createSegmentUrl(route: ActivatedRouteSnapshot) {
    return route.url.map((segment) => segment.path).join('/');
  }

  private static hasChildren(route: ActivatedRouteSnapshot): boolean {
    return route.children.length > 0;
  }

  private static isDistinctFromLastOne(breadcrumb: SentinelBreadcrumb, breadcrumbs: SentinelBreadcrumb[]): boolean {
    const lastOne = breadcrumbs[breadcrumbs.length - 1];
    return breadcrumb && !(lastOne !== undefined && breadcrumb.label === lastOne.label);
  }

  private static createBreadcrumb(route: ActivatedRouteSnapshot, url: string): Optional<SentinelBreadcrumb> {
    if (!this.isPrimaryOutlet(route)) {
      return undefined;
    }
    if (route.routeConfig && route.routeConfig.data && this.hasBreadcrumbData(route.routeConfig.data)) {
      return this.createFromStaticData(route, url);
    } else {
      return this.createFromDynamicData(route, url);
    }
  }

  private static createFromStaticData(route: ActivatedRouteSnapshot, url: string): Optional<SentinelBreadcrumb> {
    if (route.routeConfig?.data) {
      const label = route.routeConfig.data[this.selector];
      return label ? new SentinelBreadcrumb(route.routeConfig.data[this.selector], url) : undefined;
    } else {
      return undefined;
    }
  }

  private static hasBreadcrumbData(data: Data): boolean {
    return data && Object.prototype.hasOwnProperty.call(data, this.selector);
  }

  private static isPrimaryOutlet(route: ActivatedRouteSnapshot): boolean {
    return route.outlet === PRIMARY_OUTLET;
  }

  private static createFromDynamicData(route: ActivatedRouteSnapshot, url: string): Optional<SentinelBreadcrumb> {
    if (this.hasBreadcrumbData(route.data)) {
      return new SentinelBreadcrumb(route.data[this.selector], url);
    } else {
      return undefined;
    }
  }
}
