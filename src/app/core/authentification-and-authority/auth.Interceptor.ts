import { Injectable } from '@angular/core'
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, } from '@angular/common/http'
import { SessionService } from './session.service'
// eslint-disable-next-line no-restricted-imports
import { Observable } from 'rxjs'


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private sessionService: SessionService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.method === 'POST' && request.url.endsWith('/sessions')) {
      return next.handle(request)
    }

    const authHeader = 'Bearer ' + this.sessionService.getToken()
    const authReq = request.clone({setHeaders: {Authorization: authHeader}})
    return next.handle(authReq)
  }
}
