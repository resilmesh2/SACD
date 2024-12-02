/**
 * Class representing an agenda container
 */
import { MenuElement } from './menu-element';

export class AgendaContainer extends MenuElement {
  /**
   * Agendas of the container
   */
  children: MenuElement[];
  constructor(label: string, menuElements: MenuElement[]) {
    super(label);
    this.children = menuElements;
  }
}
