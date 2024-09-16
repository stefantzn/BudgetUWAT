import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BudgetItem } from './app.component';

@Injectable({
 providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:5000/api/data'; // Update with your backend URL

  constructor(private http: HttpClient) { }

  getData(): Observable<BudgetItem[]> {
    return this.http.get<BudgetItem[]>(this.apiUrl);
  }
}