// dashboard.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard-panel">
      <iframe 
        src="http://localhost:4201" 
        width="100%" 
        height="600px"
        frameborder="0">
      </iframe>
    </div>
  `,
  styles: [`
    .dashboard-panel {
      width: 100%;
      height: 100vh;
      padding: 20px;
    }
  `]
})
export class BlankComponent { }