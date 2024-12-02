import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Agenda } from '@sentinel/layout';

@Component({
  selector: 'sentinel-agenda-element',
  templateUrl: './agenda-element.component.html',
  styleUrls: ['./agenda-element.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgendaElementComponent {
  @Input() topLevelAgendaContainersCollapsed?: boolean = false;
  @Input() agenda?: Agenda;
  @Input() maxElementNameLength = 20;
  @Input() nested = false;
  @Input() doubleNested? = false;
  @Output() agendaSelected: EventEmitter<Agenda> = new EventEmitter<Agenda>();

  onAgendaSelected(agenda: Agenda): void {
    this.agendaSelected.emit(agenda);
  }
}
