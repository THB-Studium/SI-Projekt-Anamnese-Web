import { Component, Input, OnInit } from '@angular/core'
import { SessionService } from '../../../core/authentification-and-authority/session.service'
import { LoginService } from '../../../components/log-in/login.service'
import { Router } from '@angular/router'
import { rootingPaths } from '../../const/rooting-paths'
import { constant } from '../../const/constante'

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
      this.homePath = '/' + rootingPaths.home_patient
    }

    if (this.sessionService.getPersonTypeKey() === constant.personal) {
      this.homePath = '/' + rootingPaths.home_personal
    }
  }

  ngOnInit(): void {
    this.currentUserName = this.sessionService.getUsername()
  }

  logout(): void {
    this.logService.logout()
  }

  toHomePage(): void {
    this.router.navigate([this.homePath]).then()
  }

}