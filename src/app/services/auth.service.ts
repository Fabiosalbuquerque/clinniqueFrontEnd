import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CredentialsDTO } from 'app/models/credenciais.dto';
import { API_CONFIG } from 'app/config/api.config';
import { storageKeys } from 'app/config/storage_keys.config';
import { LocalUser } from 'app/models/local_user';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: Observable<any>;
  private userData = new BehaviorSubject(null);
  constructor(private http: HttpClient,
    private router: Router) { }

    authenticate(creds: CredentialsDTO) {
      return this.http.post(`${API_CONFIG.baseUrl}/login`, creds, {
          observe: 'response',
          responseType: 'text'
      });
      }
      refreshToken() {
        return this.http.post(`${API_CONFIG.baseUrl}/auth/refresh_token`,
        {},
        {
            observe: 'response',
            responseType: 'text'
        });
        }
        logout() {
          this.setLocalUser(null);
          // this.funcionarioService.setFuncionario(null);
          this.router.navigateByUrl('/');
        }
      successfulLogin(athorizationValue: string) {
        const tok = athorizationValue.substring(7);
        const userAuth: LocalUser = {
            token: tok,
            usuario: helper.decodeToken(tok).sub
        };
        this.setLocalUser(userAuth);
        // this.funcionarioService.setFuncionario(userAuth.email);
        this.router.navigateByUrl('/dashboard');
    }
    loadStoredToken() {
      const tokenlocal = localStorage.getItem(storageKeys.LocalUser);
      if (tokenlocal) {
            const decoded = helper.decodeToken(JSON.parse(tokenlocal).token);
            this.userData.next(decoded);
            return true;
          } else {
            return false;
          }
     }
    setLocalUser(obj: LocalUser) {
      if ( obj == null ) {
        localStorage.removeItem(storageKeys.LocalUser);
        this.router.navigateByUrl('/');
      } else {
        localStorage.setItem(storageKeys.LocalUser, JSON.stringify(obj));
      }
    }
    getLocalUser(): string {
      return JSON.parse(localStorage.getItem(storageKeys.LocalUser)).usuario;
    }
}
