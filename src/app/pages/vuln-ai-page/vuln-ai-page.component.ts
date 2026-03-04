import {
  Component,
  computed,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { SentinelCardComponent } from '@sentinel/components/card';
import { SentinelButtonWithIconComponent } from "@sentinel/components/button-with-icon";
import { VulnAIPageService } from './vuln-ai-page.service';
import DOMPurify from 'dompurify';
import { marked } from 'marked';

type VulnAIResponse = {
    human_result: string;
    language: string;
    query: string;
    question: string;
    result: string;
}

@Component({
  selector: 'vuln-ai-page',
  templateUrl: './vuln-ai-page.component.html',
  styleUrls: ['./vuln-ai-page.component.scss'],
  imports: [FormsModule, MatFormFieldModule, MatInputModule, SentinelCardComponent],
})
export class VulnAIPageComponent implements OnInit {
    question: WritableSignal<string> = signal('');
    response: WritableSignal<VulnAIResponse | null> = signal(null);
    humanMarkdownResult = signal('');

    constructor(
        private route: ActivatedRoute,
        private vulnAIService: VulnAIPageService,
    ) {}

    ngOnInit(): void {} 

    askQuestion() {
        console.log(this.question());
        this.vulnAIService.sendQuestion(this.question()).subscribe(async (response) => {
            console.log('AI Response:', response);
            this.response.set(response as VulnAIResponse);
        });
    }

    cleanHumanMarkdownResult = computed(() => {
        if (!this.response()) return '';
        return DOMPurify.sanitize(marked.parse(this.response()?.human_result ?? '') as string);
    });
}