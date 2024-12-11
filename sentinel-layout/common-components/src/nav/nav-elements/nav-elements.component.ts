import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Agenda, AgendaContainer } from '@sentinel/layout';

@Component({
  selector: 'sentinel-nav-elements',
  templateUrl: './nav-elements.component.html',
  styleUrls: ['./nav-elements.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavElementsComponent {
  @Input() elements: AgendaContainer[] = [];
  @Input() topLevelAgendaContainersCollapsed?: boolean = false;
  @Input() maxElementNameLength = 20;
  @Output() agendaSelected: EventEmitter<Agenda> = new EventEmitter<Agenda>();

  onAgendaSelected(agenda: Agenda): void {
    this.agendaSelected.emit(agenda);
  }
}
