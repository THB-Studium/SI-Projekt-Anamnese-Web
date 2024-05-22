import {Component, Input, OnInit} from '@angular/core'

import {PersonService} from '../../../services/person.service'
import {IPerson} from '../../../model/person.interface'
import {MyProfileModalComponent} from '../../home-patient/my-profile-modal/my-profile-modal.component'
import {IDeleteConfirmation} from '../../../model/delete-confirmation.interface'
import {DeleteConfirmationComponent} from '../../../shared/dialogs/delete-confirmation/delete-confirmation.component'
import {
  StartNewRegistrationModalComponent
} from '../../../shared/dialogs/start-new-registration-modal/start-new-registration-modal.component'
import {MatSnackBar} from '@angular/material/snack-bar'
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {catchError, Observable, throwError} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {map} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css'],
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatButtonModule, MatTooltipModule, MatIconModule, AsyncPipe]
})
export class PersonListComponent implements OnInit {
  @Input() currentPersonType: string = undefined

  displayedColumns: Array<string> = ['#', 'vorname', 'nachname', 'username', 'action']
  personsList$: Observable<IPerson[]> = undefined

  constructor(
    private personService: PersonService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.listPersons()
  }


  onAddNewPerson(): void {
    const dialogRef: MatDialogRef<StartNewRegistrationModalComponent> =
      this.dialog.open(StartNewRegistrationModalComponent, {
        data: {personType: this.currentPersonType}
      })

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.answer) {
        this.listPersons()
      }
    })
  }

  onPersonInfo(person: IPerson): void {
    const dialogRef: MatDialogRef<MyProfileModalComponent> = this.dialog.open(MyProfileModalComponent, {
      width: '750px',
      data: {person: person, personType: this.currentPersonType}
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result?.answer) {
        this.listPersons()
      }
    })
  }

  onDeletePatient(person: IPerson): void {
    const dialogRef: MatDialogRef<DeleteConfirmationComponent> = this.dialog.open(DeleteConfirmationComponent, {
      disableClose: true,
      data: <IDeleteConfirmation>{entityType: person.type, entityName: person.firstName + ' ' + person.lastName}
    })

    dialogRef.afterClosed().subscribe(answer => {
      if (answer) {
        this.deletePerson(person.id)
      }
    })
  }

  private listPersons(): void {
    this.personsList$ = this.personService.getAll()
      .pipe(
        map((persons: IPerson[]) =>
          persons.filter((person: IPerson): boolean => person.type === this.currentPersonType)
        ),
        catchError((error: HttpErrorResponse) => {
          console.error('Error in PersonListComponent.listPersons()', error);
          this.snackBar.open('Could not fetch patients', 'Close', {
            duration: 4000
          });
          return throwError(() => new Error(error.message))
        })
      )
  }

  private deletePerson(personId: string): void {
    this.personService.delete(personId)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error in PersonListComponent.deletePerson():', error);
          this.snackBar.open('Could not delete user', 'Close', {
            duration: 4000
          });
          return throwError(() => new Error(error.message))
        })
      )
      .subscribe(() => this.listPersons());
  }

}
