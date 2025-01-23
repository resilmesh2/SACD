import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class NetworkLandscapeService {
  private apiUrl = 'http://localhost:3001/api';

  constructor(private http: HttpClient) {}

  /**
   * Fetches the initial CIDR range data and populates the virtual network on the backend.
   * @returns A promise that resolves when the operation is complete.
  */
  fetchInitialCIDRData(): Observable<any> {
    const url = `${this.apiUrl}/fetch-cidr-data`;
    return this.http.get(url).pipe(
      catchError((error) => {
        console.error('Failed to fetch initial CIDR data:', error);
        return of(null); // Return null in case of error
      })
    );
  }

  /**
   * Fetches the complete virtual network data from the backend.
   * @returns A promise that resolves with the network elements.
  */
  getVirtualNetwork(): Observable<any> {
    const url = `${this.apiUrl}/get-virtual-network-data`;
    return this.http.get(url).pipe(
      catchError((error) => {
        console.error('Error fetching virtual network data:', error);
        return of(null);
      })
    );
  }

  /**
   * Updates and builds Treemap visualization 
   * @param supernet The network range to serve as root of the treemap.
   * @param netRangePrefix The network range to fetch.
   * @returns a promise that updates the treemap with network elements.
  */
  updateCIDRTreemap(supernet: string, cidrDict: string): Observable<{ treemap: any; cidrSuffixes: string[] }>  {
    const url = `${this.apiUrl}/build-cidr-treemap`;

    // Construct the request payload
    const payload = {
      supernet,
      cidrDict,
    };

    return this.http.post<{ treemap: any; cidrSuffixes: string[] }>(url, payload).pipe(
      catchError((error) => {
        console.error('Error building CIDR treemap:', error);
        return of({ treemap: null, cidrSuffixes: [] }); // Return default values in case of an error
      })
    );

  }
}
