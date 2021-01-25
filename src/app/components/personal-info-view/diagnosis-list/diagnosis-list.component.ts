import { Component, Input, OnInit } from '@angular/core'
import { v4 as uuid } from 'uuid'
import { IDiagnosis } from '../../../model/diagnosis.interface'
import { DiagnosisService } from '../../services/diagnosis.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatDialog } from '@angular/material/dialog'
import { DeleteConfirmationComponent } from '../../../shared/dialogs/delete-confirmation-modal/delete-confirmation.component'
import { IDeleteConfirmation } from '../../../model/delete-confirmation.interface'
import { DiagnosisModalComponent } from '../../../shared/dialogs/diagnosis-modal/diagnosis-modal.component'
import { IPerson } from '../../../model/person.interface'

@Component({
  selector: 'app-diagnosis-list',
  templateUrl: './diagnosis-list.component.html',
  styleUrls: ['./diagnosis-list.component.css']
})
export class DiagnosisListComponent implements OnInit {
  @Input() patientsList: Array<IPerson> = []

  displayedColumns: string[] = ['#', 'patient', 'examinations', 'date', 'type', 'action']
  diagnosisList: Array<IDiagnosis> = []

  constructor(
    private diagnosisService: DiagnosisService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.listDiagnosis()
  }

  onAddNewOrEdit(diagnosis?: IDiagnosis): void {
    const dialogRef = this.dialog.open(DiagnosisModalComponent, { // TODO
      width: '750px',
      data: diagnosis
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.answer) {
        this.listDiagnosis()
      }
    })
  }

  onDelete(diagnosis: IDiagnosis): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      disableClose: true,
      data: <IDeleteConfirmation>{entityType: 'Diagnosis', entityName: diagnosis.examinationName}
    })

    dialogRef.afterClosed().subscribe(answer => {
      if (answer) {
        this.deleteDiagnosis(diagnosis.id)
      }
    })
  }

  private saveOnAddNew(diagnosis: IDiagnosis): void {
    this.diagnosisService.add(diagnosis).subscribe(() => {
        this.listDiagnosis()
      },
      err => {
        console.log('Error in DiagnosisListComponent.saveAddNewDiagnosis()')
        console.log(err)
        this.snackBar.open('Could not add this allergy', 'Close', {
          duration: 4000
        })
      }
    )
  }

  private saveOnEdit(diagnosisId: uuid, update: IDiagnosis): void {
    this.diagnosisService.edit(diagnosisId, update).subscribe(() => {
        this.listDiagnosis()
      },
      err => {
        console.log('Error in DiagnosisListComponent.saveEditDiagnosis()')
        console.log(err)
        this.snackBar.open('Could not edit this diagnosis', 'Close', {
          duration: 4000
        })
      }
    )
  }

  private listDiagnosis(): void {
    this.diagnosisService.getAll().subscribe((diagnosis: any) => {
        this.diagnosisList = diagnosis
      },
      err => {
        console.log('Error in DiagnosisListComponent.listDiagnosis()')
        console.log(err)
        this.snackBar.open('Could not fetch diagnosis', 'Close', {
          duration: 4000
        })
      }
    )
  }

  private deleteDiagnosis(diagnosisId: uuid): void {
    this.diagnosisService.delete(diagnosisId).subscribe(() => {
        this.listDiagnosis()
      },
      err => {
        console.log('Error in DiagnosisListComponent.deleteDiagnosis()')
        console.log(err)
        this.snackBar.open('Could not delete diagnosis', 'Close', {
          duration: 4000
        })
      }
    )
  }

}
