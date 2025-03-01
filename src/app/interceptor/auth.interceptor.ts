import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<any> => {
  const authService = inject(AuthService);
  const token = authService.getAccessToken();
  console.log("hello from auth interceptor");
  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(authReq).pipe(

    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && authService.getRefreshToken()) {
        return authService.refreshToken().pipe(
          switchMap((response) => {
            const newToken = response.data.token;
            localStorage.setItem('access_token', newToken);

            const newAuthReq = req.clone({
              setHeaders: { Authorization: `Bearer ${newToken}` },
            });

            return next(newAuthReq);
          }),
          catchError((refreshError) => {
            authService.logout();
            return throwError(refreshError);
          })
        );
      }

      return throwError(error);
    })
  );
};
