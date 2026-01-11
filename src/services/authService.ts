import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';

interface LoginCredentials {
  userName: string;
  Password: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  user: {
    id: string;
    name: string;
    role?: string;
  };
}

interface User {
  id: string;
  name: string;
  role?: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.studentApiURL;

  private _user$ = new BehaviorSubject<User | null>(null);
  private _isAuthenticated$ = new BehaviorSubject<boolean>(false);

  user$ = this._user$.asObservable();
  isAuthenticated$ = this._isAuthenticated$.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.restoreAuth();
  }

  /**
   * Restore auth state from storage
   */
  private restoreAuth(): void {
    // const token = localStorage.getItem('token');
    const userStr = sessionStorage.getItem('user');

    if (userStr) {
      try {
        const user: User = JSON.parse(userStr);
        this._user$.next(user);
        this._isAuthenticated$.next(true);
      } catch {
        this.clearAuth();
      }
    }
  }

  /**
   * Login
   */
  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/auth/login`,
      credentials,
      { withCredentials: true }
    ).pipe(
      tap(res => {
        if (res.success) {
          this.setAuth(res.user);
        }
      })
    );
  }

  /**
   * Logout
   */
   logout(): void {
    this.http.post(
      `${this.apiUrl}/auth/logout`,
      {},
      { withCredentials: true }
    ).subscribe({
      next: () => {
        this.clearAuth();
        if (this.router.url !== '/login') {
          this.router.navigate(['/login']);
        }
      },
      error: () => {
        // Clear local state even if server request fails
        this.clearAuth();
        if (this.router.url !== '/login') {
          this.router.navigate(['/login']);
        }
      }
    });
  }


  /**
   * Store auth data
   */
 private setAuth(user: User): void {
    sessionStorage.setItem('user', JSON.stringify(user));

    this._user$.next(user);
    this._isAuthenticated$.next(true);
  }


  /**
   * Clear auth data
   */
  private clearAuth(): void {
    sessionStorage.removeItem('user');

    this._user$.next(null);
    this._isAuthenticated$.next(false);
  }

  /**
   * Utility getters (safe)
   */
  get token(): string | null {
    return localStorage.getItem('token');
  }

  get user(): User | null {
    return this._user$.value;
  }

  get role(): string | null {
    return this._user$.value?.role ?? null;
  }

  /**
   * Role checks
   */
  hasRole(role: string): boolean {
    return this.role === role;
  }

  hasAnyRole(roles: string[]): boolean {
    return !!this.role && roles.includes(this.role);
  }
}
