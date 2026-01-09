import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

/**
 * Auth Interceptor
 * - Attaches token ONLY to API requests
 * - Handles auth errors safely
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  // Only attach token to backend API calls
  const isApiRequest = req.url.startsWith('http://localhost:3000/api');

  let authReq = req;

  if (isApiRequest) {
    const token = localStorage.getItem('token');

    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {

      if (error.status === 401) {
        // Token invalid/expired
        localStorage.clear();

        // DO NOT navigate directly during request
        router.navigateByUrl('/login');
      }

      if (error.status === 403) {
        router.navigateByUrl('/unauthorized');
      }

      return throwError(() => error);
    })
  );
};
