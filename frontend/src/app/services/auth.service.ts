import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl='http://localhost:3000';
  private token: string | null = null;

  constructor(private http: HttpClient, private router: Router) { }
  login(email: string, password: string) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`,{email,password});
  }
  saveToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }
  getToken(): string | null {
    return this.token || localStorage.getItem('token');
  }
  logout(){
    this.token = null;
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
