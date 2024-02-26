import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private customerInfoSource = new BehaviorSubject<any>(this.getStoredCustomerInfo());
  private ticketInfoSource = new BehaviorSubject<any>(null);
  ticketInfo$ = this.ticketInfoSource.asObservable();
  private seatInfoSource = new BehaviorSubject<any>(this.getStoredSeatInfo());
  private selectedSeatIdSource = new BehaviorSubject<string | null>(null);

  customerInfo$ = this.customerInfoSource.asObservable();
  seatInfo$ = this.seatInfoSource.asObservable();
  selectedSeatId$ = this.selectedSeatIdSource.asObservable();

  private fromSource = new BehaviorSubject<string>('');
  from$ = this.fromSource.asObservable();

  private toSource = new BehaviorSubject<string>('');
  to$ = this.toSource.asObservable();

  constructor(private http: HttpClient) {}

  setCustomerInfo(customerInfo: any) {
    localStorage.setItem('customerInfo', JSON.stringify(customerInfo));
    this.customerInfoSource.next(customerInfo);
  }

  setSeatInfo(seatInfo: any) {
    localStorage.setItem('seatInfo', JSON.stringify(seatInfo));
    this.seatInfoSource.next(seatInfo);
  }

  setTicketInfo(ticketInfo: any): void {
    this.ticketInfoSource.next(ticketInfo);
  }

  setFrom(from: string) {
    this.fromSource.next(from);
  }

  setTo(to: string) {
    this.toSource.next(to);
  }

  setSelectedSeatId(seatId: string | null): void {
    this.selectedSeatIdSource.next(seatId);
  }

  private getStoredCustomerInfo(): any {
    const storedCustomerInfo = localStorage.getItem('customerInfo');
    return storedCustomerInfo ? JSON.parse(storedCustomerInfo) : null;
  }

  private getStoredSeatInfo(): any {
    const storedSeatInfo = localStorage.getItem('seatInfo');
    return storedSeatInfo ? JSON.parse(storedSeatInfo) : null;
  }
}