import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stations } from '../interfaces/stations';
@Injectable({
  providedIn: 'root',
})
export class StationsService {
  constructor(private http: HttpClient) {}

  getStationCategories() {
    return this.http.get<Stations[]>(
      'https://steprailway.webwide.ge/api/stations'
    );
  }
}
