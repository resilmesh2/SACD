import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Agenda, AgendaContainer } from '@sentinel/layout';

@Component({
  selector: 'sentinel-root-agenda-container',
  templateUrl: './root-agenda-container.component.html',
  styleUrls: ['./root-agenda-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RootAgendaContainerComponent {
  @Input() rootAgendaContainer?: AgendaContainer;
  @Input() maxElementNameLength = 20;
  @Output() agendaSelected: EventEmitter<Agenda> = new EventEmitter<Agenda>();
  @Input() topLevelAgendaContainersCollapsed?: boolean = false;

  onAgendaSelected(agenda: Agenda): void {
    this.agendaSelected.emit(agenda);
  }
}
