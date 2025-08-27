import { Component } from '@angular/core';
import { IframePortalComponent } from '../iframe-portal.component';

@Component({
  selector: 'network-risk-page',
  templateUrl: './nse-page.component.html',
  styleUrls: [],
  imports: [
    IframePortalComponent
  ],
})

export class NetworkRiskComponent {
    srcUrl = "http://localhost:4201";
}