import { Component, Input, OnInit } from '@angular/core'
import { v4 as uuid } from 'uuid'
import { IPerson } from '../../../model/person.interface'
import { IMedication } from '../../../model/medication.interface'
import { MedicationService } from '../../../services/medication.service'
import { SessionService } from '../../../core/authentification-and-authority/session.service'
import { MedicationInTakeModalComponent } from '../../../shared/dialogs/medication-in-take-modal/medication-in-take-modal.component'
import { IDeleteConfirmation } from '../../../model/delete-confirmation.interface'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { DeleteConfirmationComponent } from '../../../shared/dialogs/delete-confirmation/delete-confirmation.component'

@Component({
  selector: 'app-medication-in-take-list-patient',
  templateUrl: './medication-in-take-list-patient.component.html',
  styleUrls: ['./medication-in-take-list-patient.component.css']
})
export class MedicationInTakeListPatientComponent implements OnInit {
  displayedColumns: Array<string> = ['#', 'Bezeichnung ', 'Dosierung', 'Startdatum', 'bloodDiluent', 'action']
  medicationInTakeList: Array<IMedication> = []
  @Input() currentUser: IPerson = <IPerson>{}

  constructor(
    private medicationService: MedicationService,
    private sessionService: SessionService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.listPatientMedicationInTake()
  }

  onAddNewOrEdit(medication?: IMedication): void {
    const dialogRef: MatDialogRef<MedicationInTakeModalComponent> = this.dialog.open(MedicationInTakeModalComponent, {
      width: '750px',
      data: {update: medication, parent: 'patient', patient: this.currentUser}
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.answer) {
        this.listPatientMedicationInTake()
      }
    })
  }

  onDelete(medication: IMedication): void {
    const dialogRef: MatDialogRef<DeleteConfirmationComponent> = this.dialog.open(DeleteConfirmationComponent, {
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
    this.medicationService.add(medication).subscribe((): void => {
        this.listPatientMedicationInTake()
      },
      (err: Error): void => {
        console.log('Error in MedicationInTakeListPatientComponent.saveAddNewMedication()')
        console.log(err)
        this.snackBar.open('Could not add this medication', 'Close', {
          duration: 4000
        })
      }
    )
  }

  private listPatientMedicationInTake(): void {
    this.medicationService.getAllByPatientId(this.sessionService.getUserId())
      .subscribe((medications: Array<IPerson>): void => {
          this.medicationInTakeList = medications
        },
        (err: Error): void => {
          console.log('Error in MedicationInTakeListPatientComponent.listPatientMedicationInTake()')
          console.log(err)
          this.snackBar.open('Could not fetch persons', 'Close', {
            duration: 4000
          })
        }
      )
  }

  private deleteMedication(medicationId: uuid): void {
    this.medicationService.delete(medicationId).subscribe((): void => {
        this.listPatientMedicationInTake()
      },
      (err: Error): void => {
        console.log('Error in MedicationInTakeListPatientComponent.deleteMedication()')
        console.log(err)
        this.snackBar.open('Could not delete medication', 'Close', {
          duration: 4000
        })
      }
    )
  }

}
