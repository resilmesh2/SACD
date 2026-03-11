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
import { VulnAIPageService } from './vuln-ai-page.service';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import { parseNeo4jGraphResponse } from './neo4j-graph.service';
import { ForceDirectedGraphComponent } from "./force-directed-graph.component";

type VulnAIResponse = {
  human_result: string;
  language: string;
  query: string;
  visualization_query: string;
  question: string;
  result: string;
};

@Component({
  selector: 'vuln-ai-page',
  templateUrl: './vuln-ai-page.component.html',
  styleUrls: ['./vuln-ai-page.component.scss'],
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    SentinelCardComponent,
    ForceDirectedGraphComponent
],
})
export class VulnAIPageComponent implements OnInit {
  question: WritableSignal<string> = signal('');
  response: WritableSignal<VulnAIResponse | null> = signal(null);
  humanMarkdownResult = signal('');
  graphData = signal<{ nodes: any[]; edges: any[] } | null>(null);

  constructor(
    private route: ActivatedRoute,
    private vulnAIService: VulnAIPageService,
  ) {}

  ngOnInit(): void {}

  askQuestion() {
    console.log(this.question());
    this.vulnAIService
      .sendQuestion(this.question())
      .subscribe(async (response) => {
        console.log('AI Response:', response);
        this.response.set(response as VulnAIResponse);

        this.executeQuery(this.response()?.visualization_query ?? '');
      });
  }

  cleanHumanMarkdownResult = computed(() => {
    if (!this.response()) return '';
    return DOMPurify.sanitize(
      marked.parse(this.response()?.human_result ?? '') as string,
    );
  });

  executeQuery(query: string) {
    if (!query) {
      console.error('No query to execute');
      return;
    }
    this.vulnAIService.sendCypherQuery(query).subscribe((response) => {
      console.log('Cypher Query Response:', response);
      // Here you can process the response and update the UI accordingly
      const graph = parseNeo4jGraphResponse(response);
      console.log(graph.nodes, graph.edges);
        this.graphData.set(graph);
    });
  }
}
