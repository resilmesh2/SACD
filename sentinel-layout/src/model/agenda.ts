/**
 * Class representing an agenda displayed in nav
 */
import { MenuElement } from './menu-element';

export class Agenda extends MenuElement {
  /**
   * Url path of the route to agenda
   */
  path: string;

  constructor(label: string, path: string) {
    super(label);
    this.path = path;
  }
}
