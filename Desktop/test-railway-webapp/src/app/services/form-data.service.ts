import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  private customerInfoSource = new BehaviorSubject<any>({});
  customerInfo$ = this.customerInfoSource.asObservable();

  setCustomerInfo(customerInfo: any): void {
    this.customerInfoSource.next(customerInfo);
  }
}