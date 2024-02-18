import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VagonsService {
  getSeatsForCategory(category: string) {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) {}

  getVagonCategories(): Observable<any> {
    return this.http.get('https://railway.stepprojects.ge/api/vagons');
  }}