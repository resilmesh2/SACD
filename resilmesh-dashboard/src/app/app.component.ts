import { Component, OnInit, OnDestroy, ViewEncapsulation, ElementRef } from '@angular/core';
import { filter, map, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { agendaContainers } from './agendas';
import { DASHBOARD_PATH } from './paths';
import { LayoutService } from './shared/services/layout.service';

interface SentinelUser {
  picture?: string;
  name?: string;
  login?: string;
}

interface SentinelBreadcrumb {
  label: string;
  url?: string;
}

interface AgendaContainer {
  label: string;
  children: any[];
}

enum SentinelNotificationTypeEnum {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info'
}

export const user: SentinelUser = {
  picture: 'iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAYAAAA4TnrqAAAB8ElEQVR4Xu3YIQ5DQQwD0R6qFyro/Y/wy8cymAZFCnjE0loO3dfzPK9/vT/fZxveYERgcMgGvMGIwOCQDXiDEYHBIRvwBiMCg0M24A1GBAaHbMAbjAgMDtmANxgRGByyAW8wIjA4ZAPeYERgcMgGvMGIwOCQDXiDEYHBIRvwBiMCg0M24A1GBAaHbMAbjAgMDtmANxgRnC6C00VwughOF8HpIjhdBKeL4HQRnC6C00VwughOF8HpIjhdBKcb/UmxzGCXwS6DXcboMYcY7DLYZbDLGD3mEINdBrsMdhmjxxxisMtgl8EuY/SYQwx2Gewy2GWMHnOIwS6DXQa7jNFjDjHYZbDLYJcxeswhBrsMdhnsMkaPOcRgl8Eug13G6DGHGOwy2GWwyxg95hCDXQa7DHYZo8ccYrDLYJfBLmP0mEMMdhnsMthljB5ziMEug10Gu4zRYw4x2GWwy2CXEWWni+B0EZwugtNFcLoIThfB6SI4XQSni+B0EZwugtNFcLoIThfB6Ub/OyzbgDcYo8ccsgFvMEaPOWQD3mCMHnPIBrzBGD3mkA14gzF6zCEb8AZj9JhDNuANxugxh2zAG4zRYw7ZgDcYo8ccsgFvMEaPOWQD3mCMHnPIBrzBGD3mkA14gzF6zCEb8AZj9JhDNuANxg9pN4hcwILIiAAAAABJRU5ErkJggg==',
  name: 'Resilmesh User',
  login: 'resilmesh@resilmesh.eu',
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'resilmesh-dashboard';
  agendaContainers: AgendaContainer[] = [];
  user: SentinelUser;
  breadcrumbs$?: Observable<SentinelBreadcrumb[]>;

  isSidebarCollapsed = false;
  isDashboard = false;
  private destroy$ = new Subject<void>();
  isFullscreen = false;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private elementRef: ElementRef,
    private layoutService: LayoutService
  ) {
    this.agendaContainers = agendaContainers;
    this.user = user;
  }

toggleSidebar(): void {
  if (this.isDashboard) {
    return;
  }
  
  this.isSidebarCollapsed = !this.isSidebarCollapsed;
  localStorage.setItem('sidebarCollapsed', this.isSidebarCollapsed.toString());
  this.updateClasses();
}

// Add this new method after toggleSidebar
toggleSidebarFromDashboard(): void {
  // Temporarily show sidebar for navigation
  this.isDashboard = false;
  this.isSidebarCollapsed = false;
  this.updateClasses();
  
  // Auto-hide after 10 seconds of inactivity
  setTimeout(() => {
    if (this.router.url.includes(DASHBOARD_PATH)) {
      this.isDashboard = true;
      this.updateClasses();
    }
  }, 10000);
}

// Update the updateClasses method to be more specific
private updateClasses(): void {
  const hostElement = this.elementRef.nativeElement;
  
  // Clear existing classes
  hostElement.classList.remove('sidebar-collapsed', 'dashboard-fullscreen');
  document.body.classList.remove('dashboard-fullscreen');
  
  if (this.isDashboard) {
    hostElement.classList.add('dashboard-fullscreen');
    document.body.classList.add('dashboard-fullscreen');
  } else if (this.isSidebarCollapsed) {
    hostElement.classList.add('sidebar-collapsed');
  }
  
  // Force re-render
  setTimeout(() => {
    window.dispatchEvent(new Event('resize'));
  }, 100);
}

  ngOnInit(): void {
    // Subscribe to layout service
    this.layoutService.isFullscreen$
      .pipe(takeUntil(this.destroy$))
      .subscribe(fullscreen => {
        this.isFullscreen = fullscreen;
      });

    this.layoutService.sidebarCollapsed$
      .pipe(takeUntil(this.destroy$))
      .subscribe(collapsed => {
        this.isSidebarCollapsed = collapsed;
      });

    // Restore sidebar state
    const collapsed = localStorage.getItem('sidebarCollapsed');
    if (collapsed !== null) {
      this.isSidebarCollapsed = collapsed === 'true';
      this.layoutService.setSidebarCollapsed(this.isSidebarCollapsed);
    }

    // Handle route changes
    const navigationEndEvent$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      takeUntil(this.destroy$)
    );

    navigationEndEvent$.subscribe((event: NavigationEnd) => {
      const url = event.urlAfterRedirects || event.url;
      const isDashboard = url.includes(DASHBOARD_PATH);
      
      if (isDashboard) {
        this.layoutService.setFullscreen(true);
      } else if (this.isFullscreen) {
        this.layoutService.setFullscreen(false);
      }
    });

    // Check initial route
    const currentUrl = this.router.url;
    if (currentUrl.includes(DASHBOARD_PATH)) {
      this.layoutService.setFullscreen(true);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    document.body.classList.remove('sidebar-collapsed', 'dashboard-fullscreen');
  }

  addNotification(): void {
    // Handle notification if service is available
    console.log('Notification would be shown here');
    
    // If you have the notification service available, uncomment this:
    /*
    this.notificationService?.emit({
      type: this.generateRandomNotificationType(),
      title: 'Delete user with ID: 153',
      additionalInfo: ['You do not have right to perform this operation.'],
      source: 'Some Agenda',
      action: 'show',
      duration: 3000,
    }).subscribe((result: any) => console.log('Result: ' + result));
    */
  }

  private generateRandomNotificationType(): SentinelNotificationTypeEnum {
    const notificationTypes = Object.values(SentinelNotificationTypeEnum);
    return notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
  }
}