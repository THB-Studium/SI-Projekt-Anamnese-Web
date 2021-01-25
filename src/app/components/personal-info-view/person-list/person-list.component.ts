import { Component, Input, OnChanges, OnInit, SimpleChange } from '@angular/core'

import { PersonService } from '../../services/person.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { IPerson } from '../../../model/person.interface'
import { MyProfileModalComponent } from '../../home-patient/my-profile-modal/my-profile-modal.component'
import { MatDialog } from '@angular/material/dialog'
import { IDeleteConfirmation } from '../../../model/delete-confirmation.interface'
import { DeleteConfirmationComponent } from '../../../shared/dialogs/delete-confirmation-modal/delete-confirmation.component'
import { StartNewRegistrationModalComponent } from '../../../shared/dialogs/start-new-registration-modal/start-new-registration-modal.component'

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit, OnChanges {
  displayedColumns: string[] = ['#', 'vorname', 'nachname', 'username', 'action']
  personsList: any = []
  filteredPersonsList: any = []

  @Input() personType: string


  constructor(
    private personService: PersonService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.listPersons()
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }): void {
    console.log(changes)

    if (changes.personType && this.personType && this.personsList.length > 0) {
      this.setPersonList(this.personsList)
    }

  }


  onAddNewPerson(): void {
    const dialogRef = this.dialog.open(StartNewRegistrationModalComponent, {
      data: {personType: this.personType}
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.answer) {
        this.listPersons()
      }
    })
  }

  onPersonInfo(person: IPerson): void {
    const dialogRef = this.dialog.open(MyProfileModalComponent, {
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
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
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
    this.personService.getAll().subscribe((data: any) => {
        this.personsList = data
        this.setPersonList(data)
      },
      err => {
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
      ? this.filteredPersonsList = data.filter((person: IPerson) => person.type === 'personal')
      : this.filteredPersonsList = data.filter((person: IPerson) => person.type === 'patient')
  }

  private deletePerson(personId: string): void {
    this.personService.delete(personId).subscribe(() => {
        this.listPersons()
      },
      err => {
        console.log('Error in PersonListComponent.deletePerson()')
        console.log(err)
        this.snackBar.open('Could not delete user', 'Close', {
          duration: 4000
        })
      }
    )
  }

}
