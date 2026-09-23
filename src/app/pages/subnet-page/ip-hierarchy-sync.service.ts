import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IpHierarchySyncService {
  private http = inject(HttpClient);

  // Rebuilds all IP->Subnet and Subnet->Subnet [PART_OF] relationships in ISIM
  sync(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${environment.restApi}/ip-hierarchy-sync`, null);
  }
}
