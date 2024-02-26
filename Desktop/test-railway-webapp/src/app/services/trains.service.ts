import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Trains } from '../interfaces/trains';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root',
})
export class TrainsService {
  getTrainInfo(arg0: string, arg1: string, selectedCategory: any) {
    throw new Error('Method not implemented.');
  }
  private trainInfoSource = new BehaviorSubject<any>(null);
  trainInfo$ = this.trainInfoSource.asObservable();

  constructor(private http: HttpClient) {}

 
  

  getTrainAvailable(from: string, to: string, date?: NgbDate): Observable<Trains[]> {
    let params = new HttpParams().set('from', from).set('to', to);

    if (date) {
      params = params.set('date', `${date.year}-${date.month}-${date.day}`);
    }

    return this.http.get<Trains[]>('https://railway.stepprojects.ge/api/trains', { params });
  }

  checkTrainDate(train: any, selectedDate: NgbDate | null): boolean {
    if (!selectedDate) {
      return true;
    }

    const trainDate: Partial<NgbDate> = {
      year: parseInt(train.date.split('/')[2]),
      month: parseInt(train.date.split('/')[1]),
      day: parseInt(train.date.split('/')[0]),
    };

    return (
      this.areDatesEqual(trainDate as NgbDate, selectedDate) ||
      this.getDayOfWeek(trainDate as NgbDate) === this.getDayOfWeek(selectedDate)
    );
  }

  private areDatesEqual(date1: NgbDate, date2: NgbDate): boolean {
    return date1.year === date2.year && date1.month === date2.month && date1.day === date2.day;
  }

  private getDayOfWeek(selectedDate: NgbDate): string {
   
    return '';
  }
}