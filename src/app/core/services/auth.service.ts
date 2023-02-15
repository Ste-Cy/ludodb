import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, delay, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginUrl = environment.AUTH_URL;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private _http: HttpClient, private _router: Router) { }

  login(username: string, password: string): Observable<any> {
    return this._http.post<any>(`${this.loginUrl}`, { username, password }, this.httpOptions).pipe(
      catchError((error) => {
        console.log(error);
        return of(null);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this._router.navigateByUrl('/collection');
  }

  setSession(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }


  isLoggedIn(): boolean {
    const token = this.getToken();
    return token ? true : false;
  }
}
