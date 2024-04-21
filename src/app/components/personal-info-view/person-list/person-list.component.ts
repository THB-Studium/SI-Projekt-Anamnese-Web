import { Component, Input, OnChanges, OnInit, SimpleChange } from '@angular/core'

import { PersonService } from '../../../services/person.service'
import { IPerson } from '../../../model/person.interface'
import { MyProfileModalComponent } from '../../home-patient/my-profile-modal/my-profile-modal.component'
import { IDeleteConfirmation } from '../../../model/delete-confirmation.interface'
import { DeleteConfirmationComponent } from '../../../shared/dialogs/delete-confirmation/delete-confirmation.component'
import {
  StartNewRegistrationModalComponent
} from '../../../shared/dialogs/start-new-registration-modal/start-new-registration-modal.component'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-person-list',
    templateUrl: './person-list.component.html',
    styleUrls: ['./person-list.component.css'],
    standalone: true,
    imports: [MatCardModule, MatTableModule, MatButtonModule, MatTooltipModule, MatIconModule]
})
export class PersonListComponent implements OnInit, OnChanges {
  displayedColumns: Array<string> = ['#', 'vorname', 'nachname', 'username', 'action']
  personsList: Array<IPerson> = []
  filteredPersonsList: Array<IPerson> = []

  @Input() personType: string


  constructor(
    private personService: PersonService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.listPersons()
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }): void {


    if (changes.personType && this.personType && this.personsList.length > 0) {
      this.setPersonList(this.personsList)
    }

  }


  onAddNewPerson(): void {
    const dialogRef: MatDialogRef<StartNewRegistrationModalComponent> = this.dialog.open(StartNewRegistrationModalComponent, {
      data: {personType: this.personType}
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
      data: {person: person, personType: this.personType}
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.answer) {
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
    this.personService.getAll().subscribe((data: Array<IPerson>): void => {
        this.personsList = data
        this.setPersonList(data)
      },
      (err: Error): void => {
        console.log('Error in PersonListComponent.listPersons()')
        console.log(err)
        this.snackBar.open('Could not fetch patients', 'Close', {
          duration: 4000
        })
      }
    )
  }

  private setPersonList(data: Array<IPerson>): void {
    this.personType === 'personal'
      ? this.filteredPersonsList = data.filter((person: IPerson): boolean => person.type === 'personal')
      : this.filteredPersonsList = data.filter((person: IPerson): boolean => person.type === 'patient')
  }

  private deletePerson(personId: string): void {
    this.personService.delete(personId).subscribe((): void => {
        this.listPersons()
      },
      (err: Error): void => {
        console.log('Error in PersonListComponent.deletePerson()')
        console.log(err)
        this.snackBar.open('Could not delete user', 'Close', {
          duration: 4000
        })
      }
    )
  }

}
