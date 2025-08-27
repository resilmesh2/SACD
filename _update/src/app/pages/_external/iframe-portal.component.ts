import { Component, input, InputSignal, OnInit } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
  selector: 'iframe-portal',
  templateUrl: './iframe-portal.component.html',
  styleUrls: ['./iframe-portal.component.scss'],
  imports: [],
})

export class IframePortalComponent implements OnInit {
    src: InputSignal<string> = input('');
    safeURL: SafeResourceUrl | null = null;

    constructor(private sanitizer: DomSanitizer) {
    }

    ngOnInit(): void {
      console.log(this.src());
      this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.src());
    }
}