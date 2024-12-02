import { Injectable, signal } from '@angular/core';
import { SentinelLayoutI18nMapping } from './sentinel-layout-i18n-mapping';

@Injectable()
export class SentinelLayoutI18nService {
  private state = signal<SentinelLayoutI18nMapping>({});
  readonly stateSig = this.state.asReadonly();

  update(i18n: SentinelLayoutI18nMapping) {
    this.state.set(i18n);
  }
}
