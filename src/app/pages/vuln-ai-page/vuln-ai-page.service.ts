import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class VulnAIPageService {
  private API_URL = 'http://localhost:8000/vulnllama';
  private http = inject(HttpClient);
  constructor() {}

  sendQuestion(question: string) {
    return this.http.post(`${this.API_URL}`, { question });
  }
}