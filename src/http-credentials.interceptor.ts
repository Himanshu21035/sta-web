// http-credentials.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';

export const httpCredentialsInterceptor: HttpInterceptorFn = (req, next) => {
  // ✅ Automatically include credentials (cookies) with all requests
  const clonedReq = req.clone({
    withCredentials: true
  });
  
  return next(clonedReq);
};
