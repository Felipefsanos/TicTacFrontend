import { TokenService } from './../services/token.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidTokenGuard implements CanActivate {

  constructor(private tokenService: TokenService, private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const token = this.tokenService.getToken();

      if (!token || !token.token) {
        this.router.navigate(['/auth/login']);
        return false;
      }

      if (!this.tokenService.validToken(token)) {
        this.router.navigate(['/s/sessao-expirada']);
        return false;
      }

      return true;
  }

}
