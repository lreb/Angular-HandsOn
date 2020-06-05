import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiHeaderInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log(`interceptor: ${req}`);
    // console.log(`interceptor: ${req.url}`);
    const headers = req.headers
      .set('Content-Type', 'application/json');
    const authReq = req.clone({ headers });
    return next.handle(authReq);
  }
}
