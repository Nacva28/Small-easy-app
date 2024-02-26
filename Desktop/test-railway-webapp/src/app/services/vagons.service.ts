import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VagonsService {
  constructor(private http: HttpClient) {}

  getVagonCategories(): Observable<any> {
    return this.http.get('https://railway.stepprojects.ge/api/vagons').pipe(
      tap((response: any) => {
        console.log('API Response:', response);
      }),
      catchError((error: any) => {
        console.error('Error in getVagonCategories:', error);
        throw error;
      })
    );
  }
}