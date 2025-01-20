import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class VirtualNetworkService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  /**
   * Fetches the initial CIDR data and populates the virtual network on the backend.
   * @returns A promise that resolves when the operation is complete.
  */
  fetchInitialCIDRData(): Promise<void> {
    const url = `${this.apiUrl}/fetch-cidr-data`;

    return this.http
      .get<{ message: string }>(url)
      .pipe(
        catchError((error) => {
          console.error('Failed to fetch initial CIDR data:', error);
          return of({ message: 'Failed to fetch data' });
        })
      )
      .toPromise()
      .then((response) => {
        if (response && response.message !== 'Failed to fetch data') {
          console.log('Initial CIDR data fetched:', response.message);
        }
      });
  }

  /**
   * Fetches the initial CIDR data and populates the virtual network on the backend.
   * @param netRange The network range to fetch.
   * @returns A promise that resolves when the operation is complete.
  */
  fetchInitialSubnetData(netRange: string): Promise<void> {
    const url = `${this.apiUrl}/fetch-subnet-data`;

    return this.http
      .get<{ message: string }>(url, { params: { netRange } })
      .pipe(
        catchError((error) => {
          console.error('Failed to fetch initial CIDR data:', error);
          return of({ message: 'Failed to fetch data' });
        })
      )
      .toPromise()
      .then((response) => {
        if (response && response.message !== 'Failed to fetch data') {
          console.log('Initial CIDR data fetched:', response.message);
        }
      });
  }

  /**
   * Fetches the complete virtual network data from the backend.
   * @returns A promise that resolves with the network elements.
  */
  getVirtualNetworkData(): Promise<any[]> {
    const url = `${this.apiUrl}/get-virtual-network-data`;

    return this.http
      .get<any[]>(url)
      .pipe(
        catchError((error) => {
          console.error('Failed to fetch virtual network data:', error);
          return of([]); // Default to an empty array
        })
      )
      .toPromise()
      .then((response) => response || []);
  }

  /**
   * Expands the virtual network by fetching neighbors of a specific node.
   * @param nodeId The ID of the node to expand.
   * @param nodeType The type of the node (e.g., Subnet, IP).
   * @returns A promise that resolves with the API response message.
   */
  expandVirtualNetwork(nodeId: string, nodeType: string): Promise<string> {
    const url = `${this.apiUrl}/expand-virtual-network/${nodeId}/${nodeType}`;

    return this.http
      .get<{ message: string }>(url)
      .pipe(
        catchError((error) => {
          console.error(`Failed to expand virtual network for node ${nodeId}:`, error);
          return of({ message: 'Failed to expand virtual network' });
        })
      )
      .toPromise()
      .then((response) => response?.message || 'Operation completed with no response.');
  }

  /**
   * Collapses the virtual network by removing neighbors of a specific node.
   * @param expandedData The data of the expanded nodes to be removed.
   * @returns A promise that resolves with the API response message.
   */
  collapseVirtualNetwork(expandedData: any[]): Promise<string> {
    const url = `${this.apiUrl}/collapse-virtual-network`;

    return this.http
      .post<{ message: string }>(url, expandedData, {
        headers: { 'Content-Type': 'application/json' },
      })
      .pipe(
        catchError((error) => {
          console.error('Failed to collapse virtual network:', error);
          return of({ message: 'Failed to collapse virtual network' });
        })
      )
      .toPromise()
      .then((response) => response?.message || 'Operation completed with no response.');
    }
}
