import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { Router } from '@angular/router'
import { LoginService } from './login.service'
import { SessionService } from '../../core/authentification-and-authority/session.service'
import { IPerson } from '../../model/person.interface'
import { rootingPath } from '../../shared/rooting-path'
import { v4 as uuid } from 'uuid'
import { PersonService } from '../services/person.service'
import { environment } from '../../../environments/environment'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  @Output() registered: EventEmitter<any> = new EventEmitter()
  hidePassword: boolean = true
  isClicked: boolean
  username: string
  password: string

  readonly new_registration_path: string
  readonly reset_password_path: string
  readonly currentEnvironment: string

  constructor(
    private router: Router,
    private loginService: LoginService,
    private sessionService: SessionService,
    private personService: PersonService,
    private snackBar: MatSnackBar,
  ) {
    this.currentEnvironment = environment.currentEnvironment
    this.new_registration_path = '/' + rootingPath.new_registration
    this.reset_password_path = '/' + rootingPath.reset_password
  }

  ngOnInit(): void { this.cleanAllOnInit() }

  /*** to log the current user in ***/
  login(): void {
    this.isClicked = true
    this.loginService.login(this.username, this.password)
      .subscribe((data: any) => {
          this.sessionService.setSession(data, this.username)
          console.log('token: ' + this.sessionService.getToken())
          this.getConnectedUser(data.id)
        },
        (error: any) => {
          console.log('Error in LoginComponent.login()')

          if (error.status === 401) {
            this.snackBar.open(
              'Invalid User Name and/or password. Please try again.', 'Close',
              {duration: 4000}
            )
          }

          if (error.status === 403) {
            this.snackBar.open(
              'Access Denied! Please refer to System Administrator', 'Close',
              {duration: 4000}
            )
          }

          this.cleanAllOnInit()
        }
      )
  }

  private getConnectedUser(userId: uuid): void {
    this.personService.getOne(userId).subscribe((person: IPerson) => {
      if (person && person.id) {
        this.toDashboard(person.type.toLowerCase())
      }
    },
      err => {
        console.log('Error in LoginComponent.getConnectedUser()')
        console.log(err)
        this.snackBar.open('Could not get current connected user', 'Close', {
          duration: 4000
        })
    })
  }

  /*** to go to the dashboard ***/
  private toDashboard(personType: string): void {
    this.registered.emit()
    this.sessionService.setPersonTypeKey(personType)
    this.router.navigate(['/home_' + personType.toLowerCase()])
  }

  /*** to clean the current session ***/
  private cleanAllOnInit(): void {
    this.sessionService.clearSession()
    this.username = ''
    this.password = ''
    this.isClicked = false
  }

}
