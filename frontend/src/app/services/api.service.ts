import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl='http://localhost:3000';
  constructor(private http: HttpClient) { }
  getSensexData(page:number=1):Observable<any>{
    return this.http.get(`${this.apiUrl}/sensex?page=${page}`);
  }
  addSensexEntry(entry:{Open:number,Close:number}):Observable<any>{
    return this.http.post(`${this.apiUrl}/sensex`,entry);
  }
}
