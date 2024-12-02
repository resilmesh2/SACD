import { Injectable } from '@angular/core';
import { SidebarState } from './sidebar-types';

@Injectable({
  providedIn: 'root',
})
export class SidebarStatePreferenceService {
  readonly PREFERENCE_KEY = 'sentinel_layout_sidebar_state';

  get(): SidebarState | undefined {
    const item = localStorage.getItem(this.PREFERENCE_KEY);
    return item ? (item as SidebarState) : undefined;
  }

  set(state: SidebarState): void {
    localStorage.setItem(this.PREFERENCE_KEY, state);
  }

  clear(): void {
    localStorage.removeItem(this.PREFERENCE_KEY);
  }
}
