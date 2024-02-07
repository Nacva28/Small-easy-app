import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; // Import Observable if not imported
import { Trains } from '../interfaces/trains';

@Injectable({
  providedIn: 'root'
})
export class TrainsService {

  constructor(private http: HttpClient) {}

  getTrainAvailable(): Observable<Trains[]> {
    return this.http.get<Trains[]>('https://steprailway.webwide.ge/api/trains');
  }
  
}
