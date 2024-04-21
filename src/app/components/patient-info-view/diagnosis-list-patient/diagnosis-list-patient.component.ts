import { Component, Input, OnChanges, OnInit, SimpleChange } from '@angular/core'
import { v4 as uuid } from 'uuid'
import { DiagnosisService } from '../../../services/diagnosis.service'
import { SessionService } from '../../../core/authentification-and-authority/session.service'
import { IDiagnosis } from '../../../model/diagnosis.interface'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatDialog } from '@angular/material/dialog'
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-diagnosis-list-patient',
    templateUrl: './diagnosis-list-patient.component.html',
    styleUrls: ['./diagnosis-list-patient.component.css'],
    standalone: true,
    imports: [MatCardModule, MatTableModule]
})
export class DiagnosisListPatientComponent implements OnInit, OnChanges {
  @Input() patientId: uuid

  displayedColumns: Array<string> = ['#', 'Untersuchungsname', 'Datum', 'Körperteil']
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
    if (changes.patientId && this.patientId) {
      this.listPersonDiagnosis()
    }
  }

  private listPersonDiagnosis(): void {
    if (!this.patientId) {
      this.patientId = this.sessionService.getUserId()
    }

    this.diagnosisService.getAllByPersonId(this.patientId)
      .subscribe((diagnosisList: Array<IDiagnosis>) => this.diagnosisList = diagnosisList,
        (err: Error): void => {
          console.log('Error in DiagnosisListPatientComponent.listPersonDiagnosis()')
          console.log(err)
          this.snackBar.open('Could not fetch diagnosis', 'Close', {
            duration: 4000
          })
        }
      )
  }

}
