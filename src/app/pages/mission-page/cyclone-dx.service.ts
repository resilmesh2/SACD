import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CycloneDxService {
  private http = inject(HttpClient);
  constructor() {}

  getMissionCycloneDXJSON(name: string): Promise<any> {
    return firstValueFrom(this.http.get(`http://localhost:8000/mission/${name}/cyclonedx`));
  }
}
