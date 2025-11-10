import { Component, signal } from "@angular/core";
import { SentinelCardComponent } from "@sentinel/components/card";
import { MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { FlowEditorComponent } from "./flow-editor/flow-editor.component";


@Component({
  selector: 'mission-page',
  templateUrl: './mission-editor.component.html',
  styleUrls: ['./mission-editor.component.scss'],
  imports: [
    SentinelCardComponent,
    MatLabel,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    // MatButton,
    // SentinelButtonWithIconComponent
    FlowEditorComponent
]
})

export class MissionEditorComponent {
    missionName = signal('');
    missionDescription = signal('');
    missionCriticality = signal(0);
    globalIdIncrement = signal(1);

    // if a component group has one component => direct link to root
}