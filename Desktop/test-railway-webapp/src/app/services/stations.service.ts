import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stations } from '../interfaces/stations';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class StationsService {
  constructor(private http: HttpClient) {}
  getStationCategories(): Observable<Stations[]> {
    return this.http.get<Stations[]>(
      'https://railway.stepprojects.ge/api/stations'
    );
  }
}
