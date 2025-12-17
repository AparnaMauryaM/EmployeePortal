import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (request, next) => {
  const token = localStorage.getItem('sid');

   if (request.url.toLowerCase().indexOf('login') === -1 
    && request.url.toLowerCase().indexOf('register') === -1)
    {
        if (token) {
            const authReq = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
            });
            return next(authReq);
        }
    }
  
  return next(request);
};