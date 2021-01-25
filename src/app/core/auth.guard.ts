import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router'

import { SessionService } from './authentification-and-authority/session.service'
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs'


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private auth: SessionService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        if (this.auth.isAuthenticated()) {
            return true
        } else {
            console.log('AuthGuard: rejected --> redirecting to login')
            this.router.navigate(['/login'])
            return false
        }

    }

}
