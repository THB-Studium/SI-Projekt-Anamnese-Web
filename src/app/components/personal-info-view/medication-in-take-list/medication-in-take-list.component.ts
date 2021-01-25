import { Component, Input, OnInit } from '@angular/core'
import { v4 as uuid } from 'uuid'
import { MedicationService } from '../../services/medication.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatDialog } from '@angular/material/dialog'
import { DeleteConfirmationComponent } from '../../../shared/dialogs/delete-confirmation-modal/delete-confirmation.component'
import { IDeleteConfirmation } from '../../../model/delete-confirmation.interface'
import { IMedication } from '../../../model/medication.interface'
import { MedicationInTakeModalComponent } from '../../../shared/dialogs/medication-in-take-modal/medication-in-take-modal.component'
import { IPerson } from '../../../model/person.interface'

@Component({
  selector: 'app-medication-in-take-list',
  templateUrl: './medication-in-take-list.component.html',
  styleUrls: ['./medication-in-take-list.component.css']
})
export class MedicationInTakeListComponent implements OnInit {

  displayedColumns: string[] = ['#', 'patient', 'designation', 'dosage', 'startDate', 'action']
  medicationInTakeList: any
  @Input() patientsList: Array<IPerson> = []

  constructor(
    private medicationService: MedicationService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.listMedicationInTakeList()
  }

  onAddNewOrEdit(medication?: IMedication): void {
    const dialogRef = this.dialog.open(MedicationInTakeModalComponent, {
      width: '750px',
      data: {update: medication, parent: 'personal', patientsList: this.patientsList}
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.answer) {
        this.listMedicationInTakeList()
      }
    })
  }

  onDelete(medication: IMedication): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      disableClose: true,
      data: <IDeleteConfirmation>{entityType: 'Medikament', entityName: medication.designation}
    })

    dialogRef.afterClosed().subscribe(answer => {
      if (answer) {
        this.deleteMedication(medication.id)
      }
    })
  }

  private saveOnAddNew(medication: IMedication): void {
    this.medicationService.add(medication).subscribe(() => {
        this.listMedicationInTakeList()
      },
      err => {
        console.log('Error in MedicationInTakeListComponent.saveAddNewMedication()')
        console.log(err)
        this.snackBar.open('Could not add this medication', 'Close', {
          duration: 4000
        })
      }
    )
  }

  private listMedicationInTakeList(): void {
    this.medicationService.getAll().subscribe((medications: any) => {
        this.medicationInTakeList = medications
      },
      err => {
        console.log('Error in MedicationInTakeListComponent.listMedicationInTakeList()')
        console.log(err)
        this.snackBar.open('Could not fetch medications in take', 'Close', {
          duration: 4000
        })
      }
    )
  }

  private deleteMedication(medicationId: uuid): void {
    this.medicationService.delete(medicationId).subscribe(() => {
        this.listMedicationInTakeList()
      },
      err => {
        console.log('Error in MedicationInTakeListComponent.deleteMedication()')
        console.log(err)
        this.snackBar.open('Could not delete medication', 'Close', {
          duration: 4000
        })
      }
    )
  }

}
