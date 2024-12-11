import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AgendaContainer, Agenda } from '@sentinel/layout';
@Component({
  selector: 'sentinel-nested-agenda-container',
  templateUrl: './nested-agenda-container.component.html',
  styleUrls: ['./nested-agenda-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NestedAgendaContainerComponent {
  expanded = false;
  @Input() doubleNested? = false;
  @Input() topLevelAgendaContainersCollapsed?: boolean = false;
  @Input() agendaContainer?: AgendaContainer;
  @Input() maxElementNameLength = 15;
  @Output() agendaSelected: EventEmitter<Agenda> = new EventEmitter<Agenda>();

  onAgendaSelected(agenda: Agenda): void {
    this.agendaSelected.emit(agenda);
  }
}
