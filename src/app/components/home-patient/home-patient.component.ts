import { Component, OnInit } from '@angular/core'
import { rootingPath } from '../../shared/rooting-path'

import { SessionService } from '../../core/authentification-and-authority/session.service'
import { IPerson } from '../../model/person.interface'
import { MyProfileModalComponent } from './my-profile-modal/my-profile-modal.component'
import { MatDialog } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { IAddress } from '../../model/address.interface'
import { PersonService } from '../services/person.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-home-patient',
  templateUrl: './home-patient.component.html',
  styleUrls: ['./home-patient.component.css']
})
export class HomePatientComponent implements OnInit {
  headerTitle: string = 'Home - Willkomen!'
  currentUser: IPerson = <IPerson>{}

  readonly aufnahme_path: string
  readonly patient_info_view_path: string
  readonly currentEnvironment: string

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private sessionService: SessionService,
    private personService: PersonService,
    private snackBar: MatSnackBar
  ) {
    this.aufnahme_path = '/' + rootingPath.aufnahme
    this.patient_info_view_path = '/' + rootingPath.patient_info_view
    this.currentEnvironment = environment.currentEnvironment
  }

  ngOnInit(): void {
    this.getCurrentUser()
  }

  openMyProfilModal(): void {
    this.currentUser.address = <IAddress>{}
    const dialogRef = this.dialog.open(MyProfileModalComponent, {
      width: '750px',
      data: {person: this.currentUser, personType: 'patient'}
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed')
      // this.animal = result
    })
  }

  navTo(tabName: string): void {
    this.router.navigate([this.patient_info_view_path, {fragment: tabName}])
  }

  private getCurrentUser(): void {
    this.personService.getOne(this.sessionService.getUserId()).subscribe(
      (person: IPerson) => {
        this.currentUser = person
        console.log(this.currentUser)
      }
      ,
      err => {
        console.log('Error in HomePatientComponent.getCurrentUser()')
        console.log(err)
        this.snackBar.open('Could not fetch this current user data', 'Close', {
          duration: 4000
        })
      }
    )
  }
}
