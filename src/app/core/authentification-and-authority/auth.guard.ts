import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

import { SessionService } from './session.service'
import { Observable } from 'rxjs'
import { rootingPaths } from '../../shared/const/rooting-paths'


@Injectable()
export class AuthGuard  {
  private loginPath: string = '/' + rootingPaths.login


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
