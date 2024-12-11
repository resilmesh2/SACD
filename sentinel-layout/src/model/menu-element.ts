export abstract class MenuElement {
  /**
   * Label of the agenda
   */
  label: string;

  protected constructor(label: string) {
    this.label = label;
  }
}
