import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from 'app/services/auth.service';
import { MessagesService } from 'app/services/messages.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private auth: AuthService,
    private message: MessagesService
    ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.auth.loadStoredToken()) {
        return of(true);
      } else {
        this.message.setMessage(':(', 'Voce precisa se identificar novamente.');
        this.router.navigateByUrl('/');
        return of(false);
      }
  }

}
