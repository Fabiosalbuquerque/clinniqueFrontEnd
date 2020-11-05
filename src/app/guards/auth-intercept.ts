import { HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalUser } from 'app/models/local_user';
import { storageKeys } from 'app/config/storage_keys.config';
import { API_CONFIG } from 'app/config/api.config';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: import('@angular/common/http').HttpRequest<any>,
    next: import('@angular/common/http').HttpHandler): import('rxjs').Observable<import('@angular/common/http').HttpEvent<any>> {
      let localUser: LocalUser = {
        token: '',
        usuario: ''
    };
    localUser = JSON.parse(localStorage.getItem(storageKeys.LocalUser));
    const n = API_CONFIG.baseUrl.length;
    let requestToApi = false;
    if (API_CONFIG.baseUrl == req.url.substring(0, n)) {
       requestToApi = true;
    }
    if ( localUser && requestToApi ) {
      // console.log('enviando cabeçalho autenticado');
      // console.log(localUser);
      const authHeader = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + localUser.token)});
      return next.handle(authHeader);
    } else {
      // console.log('enviando não cabeçalho autenticado');
      return next.handle(req);
    }
    }
}
export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
};
