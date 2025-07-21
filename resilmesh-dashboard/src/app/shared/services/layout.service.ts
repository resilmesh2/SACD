import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private isFullscreenSubject = new BehaviorSubject<boolean>(false);
  private sidebarCollapsedSubject = new BehaviorSubject<boolean>(false);

  isFullscreen$ = this.isFullscreenSubject.asObservable();
  sidebarCollapsed$ = this.sidebarCollapsedSubject.asObservable();

  setFullscreen(fullscreen: boolean): void {
    this.isFullscreenSubject.next(fullscreen);
  }

  setSidebarCollapsed(collapsed: boolean): void {
    this.sidebarCollapsedSubject.next(collapsed);
  }

  getFullscreenState(): boolean {
    return this.isFullscreenSubject.value;
  }

  getSidebarCollapsedState(): boolean {
    return this.sidebarCollapsedSubject.value;
  }
}