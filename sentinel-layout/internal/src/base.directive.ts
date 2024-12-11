/**
 * Base component to handle behaviour common for all components.
 * By extending this component you don't need to store subscriptions and unsubscribe in ngOnDestroy of each component
 * but simply pipe the observable with takeWhile(() => this.isAlive)
 */
import { Directive, OnDestroy } from '@angular/core';

@Directive()
export class BaseDirective implements OnDestroy {
  protected isAlive = true;

  ngOnDestroy(): void {
    this.isAlive = false;
  }
}
