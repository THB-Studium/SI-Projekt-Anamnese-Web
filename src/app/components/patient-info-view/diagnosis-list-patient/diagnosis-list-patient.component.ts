import { Component, Input, OnChanges, OnInit, SimpleChange } from '@angular/core'
import { v4 as uuid } from 'uuid'
import { DiagnosisService } from '../../services/diagnosis.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatDialog } from '@angular/material/dialog'
import { SessionService } from '../../../core/authentification-and-authority/session.service'
import { IDiagnosis } from '../../../model/diagnosis.interface'

@Component({
  selector: 'app-diagnosis-list-patient',
  templateUrl: './diagnosis-list-patient.component.html',
  styleUrls: ['./diagnosis-list-patient.component.css']
})
export class DiagnosisListPatientComponent implements OnInit, OnChanges {
  @Input() patientId: uuid

  displayedColumns: string[] = ['#', 'Untersuchungsname', 'Datum', 'Körperteil']
  diagnosisList: Array<IDiagnosis> = []

  constructor(
    private diagnosisService: DiagnosisService,
    private sessionService: SessionService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.listPersonDiagnosis()
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }): void {
    console.log(changes)

    if (changes.patientId && this.patientId) {
      this.listPersonDiagnosis()
    }

  }

  private listPersonDiagnosis(): void {
    if (!this.patientId) {
      this.patientId = this.sessionService.getUserId()
    }
    this.diagnosisService.getAllByPersonId(this.patientId).subscribe((diagnosis: any) => {
        this.diagnosisList = diagnosis
      },
      err => {
        console.log('Error in DiagnosisListPatientComponent.listPersonDiagnosis()')
        console.log(err)
        this.snackBar.open('Could not fetch diagnosis', 'Close', {
          duration: 4000
        })
      }
    )
  }

}
