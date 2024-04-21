import { Component, Input, OnInit } from '@angular/core'
import { v4 as uuid } from 'uuid'
import { IDiagnosis } from '../../../model/diagnosis.interface'
import { DiagnosisService } from '../../../services/diagnosis.service'
import { IDeleteConfirmation } from '../../../model/delete-confirmation.interface'
import { DiagnosisModalComponent } from '../../../shared/dialogs/diagnosis-modal/diagnosis-modal.component'
import { IPerson } from '../../../model/person.interface'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { DeleteConfirmationComponent } from '../../../shared/dialogs/delete-confirmation/delete-confirmation.component'
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-diagnosis-list',
    templateUrl: './diagnosis-list.component.html',
    styleUrls: ['./diagnosis-list.component.css'],
    standalone: true,
    imports: [MatCardModule, MatTableModule, MatButtonModule, MatTooltipModule, MatIconModule]
})
export class DiagnosisListComponent implements OnInit {
  @Input() patientsList: Array<IPerson> = []

  displayedColumns: Array<string> = ['#', 'patient', 'examinations', 'date', 'type', 'action']
  diagnosisList: Array<IDiagnosis> = []

  constructor(
    private diagnosisService: DiagnosisService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.listDiagnosis()
  }

  onAddNewOrEdit(diagnosis?: IDiagnosis): void {
    const dialogRef: MatDialogRef<DiagnosisModalComponent> = this.dialog.open(DiagnosisModalComponent, { // TODO
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
    const dialogRef: MatDialogRef<DeleteConfirmationComponent> = this.dialog.open(DeleteConfirmationComponent, {
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
    this.diagnosisService.add(diagnosis).subscribe((): void => {
        this.listDiagnosis()
      },
      (err: Error): void => {
        console.log('Error in DiagnosisListComponent.saveAddNewDiagnosis()')
        console.log(err)
        this.snackBar.open('Could not add this allergy', 'Close', {
          duration: 4000
        })
      }
    )
  }

  private saveOnEdit(diagnosisId: uuid, update: IDiagnosis): void {
    this.diagnosisService.edit(diagnosisId, update).subscribe((): void => {
        this.listDiagnosis()
      },
      (err: Error): void => {
        console.log('Error in DiagnosisListComponent.saveEditDiagnosis()')
        console.log(err)
        this.snackBar.open('Could not edit this diagnosis', 'Close', {
          duration: 4000
        })
      }
    )
  }

  private listDiagnosis(): void {
    this.diagnosisService.getAll().subscribe((diagnosis: any): void => {
        this.diagnosisList = diagnosis
      },
      (err: Error): void => {
        console.log('Error in DiagnosisListComponent.listDiagnosis()')
        console.log(err)
        this.snackBar.open('Could not fetch diagnosis', 'Close', {
          duration: 4000
        })
      }
    )
  }

  private deleteDiagnosis(diagnosisId: uuid): void {
    this.diagnosisService.delete(diagnosisId).subscribe((): void => {
        this.listDiagnosis()
      },
      (err: Error): void => {
        console.log('Error in DiagnosisListComponent.deleteDiagnosis()')
        console.log(err)
        this.snackBar.open('Could not delete diagnosis', 'Close', {
          duration: 4000
        })
      }
    )
  }

}
