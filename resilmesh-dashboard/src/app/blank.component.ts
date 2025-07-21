import { Component, OnInit, OnDestroy, ElementRef, Renderer2, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-network-risk',
  template: `
    <!-- Floating hamburger menu -->
    <button 
      mat-fab 
      color="primary"
      (click)="toggleNavigation()" 
      title="Toggle Navigation"
      class="floating-hamburger"
      [class.nav-open]="showNavigation">
      <mat-icon>{{ showNavigation ? 'close' : 'menu' }}</mat-icon>
    </button>
    
    <!-- Navigation overlay -->
    <div 
      class="nav-overlay" 
      [class.show]="showNavigation" 
      (click)="hideNavigation()"
      *ngIf="showNavigation">
      <div class="nav-content" (click)="$event.stopPropagation()">
        <h3>Navigation</h3>
        <div class="nav-links">
          <a (click)="navigateAndHide('/home')">
            <mat-icon>home</mat-icon> Home
          </a>
          <a (click)="navigateAndHide('/service')">
            <mat-icon>devices</mat-icon> Assets
          </a>
          <a (click)="navigateAndHide('/issues')">
            <mat-icon>warning</mat-icon> Issues
          </a>
          <a (click)="navigateAndHide('/vulnerability')">
            <mat-icon>security</mat-icon> Vulnerabilities
          </a>
          <a (click)="navigateAndHide('/network-vizualization')">
            <mat-icon>account_tree</mat-icon> Network
          </a>
          <a (click)="navigateAndHide('/missions')">
            <mat-icon>assignment</mat-icon> Missions
          </a>
        </div>
      </div>
    </div>
    
    <!-- Dashboard iframe -->
    <div class="dashboard-container">
      <iframe 
        src="http://localhost:4201" 
        width="100%" 
        height="100%"
        frameborder="0"
        style="border: none;">
      </iframe>
    </div>
  `,
  styles: [`
    :host {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      width: 100vw !important;
      height: 100vh !important;
      z-index: 50000 !important;
      background: white !important;
    }

    .floating-hamburger {
      position: fixed !important;
      top: 20px !important;
      left: 20px !important;
      z-index: 100000 !important;
      width: 56px !important;
      height: 56px !important;
      box-shadow: 0 4px 12px rgba(0,0,0,0.4) !important;
      
      &.nav-open {
        background-color: #f44336 !important;
      }
    }

    .nav-overlay {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      width: 100vw !important;
      height: 100vh !important;
      background: rgba(0, 0, 0, 0.8) !important;
      z-index: 99999 !important;
      display: flex !important;
      align-items: flex-start !important;
      justify-content: flex-start !important;
    }

    .nav-content {
      background: white !important;
      width: 350px !important;
      height: 100vh !important;
      padding: 0 !important;
      box-shadow: 2px 0 10px rgba(0,0,0,0.3) !important;
      overflow-y: auto !important;
      position: relative !important;
      animation: slideIn 0.3s ease-out !important;
    }

    @keyframes slideIn {
      from {
        transform: translateX(-100%);
      }
      to {
        transform: translateX(0);
      }
    }

    .nav-content h3 {
      margin: 80px 20px 30px 20px !important;
      color: #1976d2 !important;
      border-bottom: 2px solid #1976d2 !important;
      padding-bottom: 10px !important;
      font-size: 24px !important;
    }

    .nav-links {
      padding: 0 20px !important;
    }

    .nav-links a {
      display: flex !important;
      align-items: center !important;
      padding: 20px 15px !important;
      text-decoration: none !important;
      color: #333 !important;
      border-bottom: 1px solid #eee !important;
      transition: all 0.2s ease !important;
      border-radius: 4px !important;
      margin-bottom: 5px !important;
      cursor: pointer !important;
      font-size: 16px !important;
      font-weight: 500 !important;
      
      &:hover {
        color: #1976d2 !important;
        background-color: #f5f5f5 !important;
        transform: translateX(5px) !important;
      }
      
      mat-icon {
        margin-right: 15px !important;
        font-size: 24px !important;
        width: 24px !important;
        height: 24px !important;
      }
    }

    .dashboard-container {
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      z-index: 1 !important;
    }
  `]
})
export class NetworkRiskComponent implements OnInit, OnDestroy {
  showNavigation = false;
  private hiddenElements: HTMLElement[] = [];
  private originalStyles: Map<HTMLElement, string> = new Map();

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.hideSentinelElements();
    }, 100);
    
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
  }

  ngOnDestroy(): void {
    this.restoreSentinelElements();
    this.renderer.removeStyle(document.body, 'overflow');
  }

  private hideSentinelElements(): void {
    const selectors = [
      'sentinel-layout1 mat-sidenav',
      'sentinel-layout1 .mat-drawer',
      'sentinel-layout1 .sidebar-drawer',
      'sentinel-layout1 .mat-sidenav',
      'sentinel-layout1 nav',
      'sentinel-layout1 .navigation',
      'sentinel-layout1 .side-nav',
      'mat-sidenav-container mat-sidenav',
      '.mat-drawer-container .mat-drawer'
    ];

    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector) as NodeListOf<HTMLElement>;
      elements.forEach(element => {
        if (element && !this.hiddenElements.includes(element)) {
          this.originalStyles.set(element, element.style.display || '');
          this.renderer.setStyle(element, 'display', 'none');
          this.hiddenElements.push(element);
        }
      });
    });

    const agendaElements = document.querySelectorAll('[class*="agenda"], [class*="nav-"]') as NodeListOf<HTMLElement>;
    agendaElements.forEach(element => {
      if (element && element.closest('sentinel-layout1') && !this.hiddenElements.includes(element)) {
        this.originalStyles.set(element, element.style.display || '');
        this.renderer.setStyle(element, 'display', 'none');
        this.hiddenElements.push(element);
      }
    });
  }

  private restoreSentinelElements(): void {
    this.hiddenElements.forEach(element => {
      const originalStyle = this.originalStyles.get(element);
      if (originalStyle !== undefined) {
        if (originalStyle === '') {
          this.renderer.removeStyle(element, 'display');
        } else {
          this.renderer.setStyle(element, 'display', originalStyle);
        }
      }
    });
    
    this.hiddenElements = [];
    this.originalStyles.clear();
  }

  toggleNavigation(): void {
    this.showNavigation = !this.showNavigation;
    this.cdr.detectChanges();
  }

  hideNavigation(): void {
    this.showNavigation = false;
    this.cdr.detectChanges();
  }

  navigateAndHide(route: string): void {
    this.hideNavigation();
    window.location.href = route;
  }
}