import {Component, OnInit} from '@angular/core'
import {rootingPaths} from '../../shared/const/rooting-paths'

import {SessionService} from '../../core/authentification-and-authority/session.service'
import {IPerson} from '../../model/person.interface'
import {MyProfileModalComponent} from './my-profile-modal/my-profile-modal.component'
import {Router, RouterLink} from '@angular/router'
import {IAddress} from '../../model/address.interface'
import {PersonService} from '../../services/person.service'
import {MatDialog} from '@angular/material/dialog'
import {MatSnackBar} from '@angular/material/snack-bar'
import {MatIconModule} from '@angular/material/icon';
import {AsyncPipe, NgIf, NgOptimizedImage} from '@angular/common';
import {HeaderComponent} from '../../shared/components/header/header.component';
import {HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {map} from "rxjs/operators";
import {BackgroundComponent} from "../background/background.component";

const importedComponents = [
  HeaderComponent, BackgroundComponent
]

@Component({
  selector: 'app-home-patient',
  templateUrl: './home-patient.component.html',
  styleUrls: ['./home-patient.component.css'],
  standalone: true,
  imports: [
    importedComponents, NgIf, RouterLink, NgOptimizedImage, MatIconModule, AsyncPipe
  ]
})
export class HomePatientComponent implements OnInit {
  readonly headerTitle: string = 'Home - Willkomen!'
  readonly aufnahme_path: string
  readonly patient_info_view_path: string

  currentUser$: Observable<IPerson> = undefined

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private sessionService: SessionService,
    private personService: PersonService,
    private snackBar: MatSnackBar
  ) {
    this.aufnahme_path = '/' + rootingPaths.aufnahme
    this.patient_info_view_path = '/' + rootingPaths.patient_info_view
  }

  ngOnInit(): void {
    this.getCurrentUser()
  }

  openMyProfilModal(): void {
    this.currentUser$.subscribe({
        next: (currentUser: IPerson): void => {
          currentUser.address = currentUser.address || <IAddress>{}
          this.dialog.open(MyProfileModalComponent, {
            width: '750px',
            data: {person: currentUser, personType: 'patient'}
          });
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error in HomePatientComponent.openMyProfilModal()', error);
          this.snackBar.open('Could not open the Profile Modal', 'Close', {
            duration: 4000
          });
          return throwError(() => new Error(error.message))
        }
      }
    );
  }

  navTo(tabName: string): void {
    this.router.navigate([this.patient_info_view_path, {fragment: tabName}]).then()
  }

  private getCurrentUser(): void {
    this.currentUser$ = this.personService.getOne(this.sessionService.getUserId())
      .pipe(
        map((person: IPerson): IPerson => {
          return person
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Error in HomePatientComponent.testGetCurrentUser()', error);
          this.snackBar.open('Could not fetch this current user data', 'Close', {
            duration: 4000
          });
          return throwError(() => new Error(error.message))
        })
      )
  }

}
