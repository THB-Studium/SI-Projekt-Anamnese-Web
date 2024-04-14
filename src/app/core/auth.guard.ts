import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'

import { SessionService } from './authentification-and-authority/session.service'
import { Observable } from 'rxjs'
import { rootingPath } from '../shared/rooting-path'


@Injectable()
export class AuthGuard implements CanActivate {
  private loginPath: string = '/' + rootingPath.login


  constructor(
    private router: Router,
    private auth: SessionService
  ) {}

  canActivate(): Observable<boolean> | boolean {
    if (this.auth.isAuthenticated()) {
      return true
    }

    // Since the user is not connected let redirect to the login page.
    this.router.navigate([this.loginPath]).then()
    return false
  }

}
