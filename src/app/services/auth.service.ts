import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CustomAuthResponse, CustomResponse } from '../model/CustomResponse';
import { loginDTO } from '../model/loginDTO';
import { HttpClient } from '@angular/common/http';
import { Common } from '../common/common';
import { Observable, tap} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = Common.getApiBaseUrl();


  constructor(
    private http : HttpClient,
    private router : Router
  ) { }



  login(user:loginDTO): Observable<any> {

    //debugger;
    return this.http.post<any>(`${this.apiUrl}/Auth/Login`, user).pipe(
      tap(response => {
        if (response.success) {
          this.setSession(response.data.accesstoken, response.data.refreshToken);
        }
      })
    );
  }

  private setSession(accessToken: string, refreshToken: string): void {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    if(token != null) return true;
    else return false;
  }


  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    return this.http.post(`${this.apiUrl}/RefreshToken`, { refreshToken }).pipe(
      tap((response: any) => {
        if (response.success) {
          this.setSession(response.data.token, response.data.refreshToken);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.router.navigate(['/login']);
  }

 
}
