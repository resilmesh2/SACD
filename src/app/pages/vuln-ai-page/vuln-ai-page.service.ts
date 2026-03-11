import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VulnAIPageService {
  private API_URL = 'http://localhost:8000/vulnllama';
  private NEO4J_URL = 'http://localhost:7474/db/neo4j/query/v2';
  private http = inject(HttpClient);
  constructor() {}

  sendQuestion(question: string) {
    return this.http.post(`${this.API_URL}`, { question });
  }

  sendCypherQuery(cypher: string) {
    return this.http.post(
      `${this.NEO4J_URL}`,
      {
        statement: cypher,
      },
      {
        headers: {
          'Content-Type': 'application/vnd.neo4j.query',
          Authorization: 'Basic ' + btoa('neo4j:supertestovaciheslo'),
          Accept: 'application/vnd.neo4j.query',
        },
      },
    );
  }
}
