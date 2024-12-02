import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WindowViewportSize } from '../model/window-viewport-size';

@Injectable({ providedIn: 'root' })
export class WindowSizeService {
  private sizeSubject$: BehaviorSubject<WindowViewportSize> = new BehaviorSubject<WindowViewportSize>({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  size$: Observable<WindowViewportSize> = this.sizeSubject$.asObservable();

  onResize(height: number, width: number): void {
    this.sizeSubject$.next({ height: height, width: width });
  }
}
