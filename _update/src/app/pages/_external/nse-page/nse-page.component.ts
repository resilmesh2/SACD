import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'network-risk-page',
  templateUrl: './nse-page.component.html',
  styleUrls: ['./nse-page.component.scss'],
  imports: [
    MatIconModule
  ],
})

export class NetworkRiskComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}