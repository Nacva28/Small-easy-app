import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trains } from '../interfaces/trains';

@Injectable({
  providedIn: 'root',
})
export class TrainsService {
  constructor(private http: HttpClient) {}

  getTrainAvailable(from: string, to: string): Observable<Trains[]> {
    const params = new HttpParams().set('from', from).set('to', to);
    return this.http.get<Trains[]>(
      'https://railway.stepprojects.ge/api/trains',
      { params }
    );
  }
}
