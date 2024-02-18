import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private customerInfoSource = new BehaviorSubject<any>(this.getStoredCustomerInfo());
  private seatInfoSource = new BehaviorSubject<any>(this.getStoredSeatInfo());

  customerInfo$ = this.customerInfoSource.asObservable();
  seatInfo$ = this.seatInfoSource.asObservable();

  setCustomerInfo(customerInfo: any) {
    localStorage.setItem('customerInfo', JSON.stringify(customerInfo));
    this.customerInfoSource.next(customerInfo);
  }

  setSeatInfo(seatInfo: any) {
    localStorage.setItem('seatInfo', JSON.stringify(seatInfo));
    this.seatInfoSource.next(seatInfo);
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