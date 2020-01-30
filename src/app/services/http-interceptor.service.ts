import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { exhaustMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private http: HttpService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.http.user.pipe(take(1), exhaustMap(user => {
      if (!user) {
        return next.handle(req);
      }
      const modifiedReq = req.clone({
        params: new HttpParams().set('auth', user.token)
      });
      return next.handle(modifiedReq);
    }));
  }
}