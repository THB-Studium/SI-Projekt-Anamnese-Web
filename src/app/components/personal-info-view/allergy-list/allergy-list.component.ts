import { Component, Input, OnInit } from '@angular/core'
import { v4 as uuid } from 'uuid'
import { AllergyService } from '../../../services/allergy.service'
import { IDeleteConfirmation } from '../../../model/delete-confirmation.interface'
import { IAllergy, IPerson } from '../../../model/person.interface'
import { AllergyModalComponent } from '../../../shared/dialogs/allergy-modal/allergy-modal.component'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { DeleteConfirmationComponent } from '../../../shared/dialogs/delete-confirmation/delete-confirmation.component'
import { LowerCasePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-allergy-list',
    templateUrl: './allergy-list.component.html',
    styleUrls: ['./allergy-list.component.css'],
    standalone: true,
    imports: [MatCardModule, MatTableModule, MatButtonModule, MatTooltipModule, MatIconModule, LowerCasePipe]
})
export class AllergyListComponent implements OnInit {
  @Input() patientsList: Array<IPerson> = []

  displayedColumns: Array<string> = ['#', 'allergy', 'patient', 'action']
  allergyList: Array<IAllergy>

  constructor(
    private allergyService: AllergyService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.listAllergies()
  }

  onAddNewOrEdit(allergy?: IAllergy): void {
    const dialogRef: MatDialogRef<AllergyModalComponent> = this.dialog.open(AllergyModalComponent, {
      width: '750px',
      data: {update: allergy, parent: 'personal', patientsList: this.patientsList}
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.answer) {
        this.listAllergies()
      }
    })
  }

  onDelete(allergy: IAllergy): void {
    const dialogRef: MatDialogRef<DeleteConfirmationComponent> = this.dialog.open(DeleteConfirmationComponent, {
      disableClose: true,
      data: <IDeleteConfirmation>{entityType: 'Allergy', entityName: allergy.name}
    })

    dialogRef.afterClosed().subscribe(answer => {
      if (answer) {
        this.deleteAllergy(allergy.id)
      }
    })
  }

  private listAllergies(): void {
    this.allergyService.getAll().subscribe((allergies: any): void => {
        this.allergyList = allergies
      },
      (err: Error): void => {
        console.log('Error in AllergyComponent.listAllergies()')
        console.log(err)
        this.snackBar.open('Could not fetch allergies', 'Close', {
          duration: 4000
        })
      }
    )
  }

  private deleteAllergy(allergyId: uuid): void {
    this.allergyService.delete(allergyId).subscribe((): void => {
        this.listAllergies()
      },
      (err: Error): void => {
        console.log('Error in AllergyComponent.deleteAllergy()')
        console.log(err)
        this.snackBar.open('Could not delete allergy', 'Close', {
          duration: 4000
        })
      }
    )
  }

}
