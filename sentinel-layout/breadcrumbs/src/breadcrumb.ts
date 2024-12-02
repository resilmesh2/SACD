/**
 * Class representing a breadcrumb in a breadcrumb navigation system
 */
export class SentinelBreadcrumb {
  label: string;
  url: string;

  constructor(label: string, url: string) {
    this.label = label;
    this.url = url;
  }
}
