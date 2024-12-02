import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  Input,
  Optional,
  Output,
  Signal,
  signal,
} from '@angular/core';
import { Agenda, AgendaContainer } from '@sentinel/layout';
import { SentinelLayoutI18nService, SentinelNavI18n } from '@sentinel/layout/i18n';

/**
 * Presentational nav component displaying agendas in its containers
 */
@Component({
  selector: 'sentinel-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  @Input() maxNavElementLength = 19;
  @Input() topLevelAgendaContainersCollapsed?: boolean;
  /**
   * Source of the logo
   */
  @Input() logoSrc?: string;

  /**
   * Application version
   */
  @Input() version?: string;

  /**
   * Containers of agendas to display in nav
   */
  @Input() agendaContainers: AgendaContainer[] = [];

  /**
   * Emits event when agenda is selected
   */
  @Output() agendaSelected: EventEmitter<Agenda> = new EventEmitter();

  i18n: Signal<SentinelNavI18n>;

  /**
   * Emits event when agenda is selected
   * @param agenda selected agenda
   */

  onAgendaSelected(agenda: Agenda) {
    this.agendaSelected.emit(agenda);
  }

  constructor(
    @Optional()
    readonly i18nService?: SentinelLayoutI18nService | null,
  ) {
    const i18nFallback: SentinelNavI18n = {
      versionTooltip: 'Version of the application',
    };
    this.i18n = this.i18nService?.stateSig()
      ? computed(() => this.i18nService?.stateSig().nav ?? i18nFallback)
      : signal(i18nFallback);
  }
}
