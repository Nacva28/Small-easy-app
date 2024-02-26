import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private baseUrl = 'https://railway.stepprojects.ge/api/tickets';

  constructor(private http: HttpClient) {}

  getTickets(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  registerTicket(ticketData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, ticketData);
  }
}