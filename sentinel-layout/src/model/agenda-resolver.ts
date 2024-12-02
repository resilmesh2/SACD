import { MenuElement } from './menu-element';
import { AgendaContainer } from './agenda-container';

export class AgendaResolver {
  static isAgendaContainer(element: MenuElement): boolean {
    return element instanceof AgendaContainer;
  }
}
