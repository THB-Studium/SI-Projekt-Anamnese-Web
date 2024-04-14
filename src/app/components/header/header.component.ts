import { Component, Input, OnInit } from '@angular/core'
import { SessionService } from '../../core/authentification-and-authority/session.service'
import { LoginService } from '../log-in/login.service'
import { Router } from '@angular/router'
import { rootingPath } from '../../shared/rooting-path'
import { constant } from '../../shared/constante'

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() title: string
  currentUserName: string

  readonly homePath: string

  constructor(
    private sessionService: SessionService,
    private logService: LoginService,
    private router: Router,
  ) {
    if (this.sessionService.getPersonTypeKey() === constant.patient) {
      this.homePath = '/' + rootingPath.home_patient
    }

    if (this.sessionService.getPersonTypeKey() === constant.personal) {
      this.homePath = '/' + rootingPath.home_personal
    }
  }

  ngOnInit(): void {
    this.currentUserName = this.sessionService.getUsername()
  }

  logout(): void {
    this.logService.logout()
  }

  toHomePage(): void {
    this.router.navigate([this.homePath])
  }

}
