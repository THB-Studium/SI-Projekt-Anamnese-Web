import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { PatientInfoViewRoutes } from './patient-info-view.routes'
import { DiagnosisListPatientComponent } from './diagnosis-list-patient/diagnosis-list-patient.component'
import { AllergyListPatientComponent } from './allergy-list-Patient/allergy-list-patient.component'
import { DiseaseListPatientComponent } from './disease-list-patient/disease-list-patient.component'
import { MedicationInTakeListPatientComponent } from './medication-in-take-list-patient/medication-in-take-list-patient.component'
import { PersonViewComponent } from './person-view/person-view.component'
import { MatCardModule } from '@angular/material/card'
import { MatTableModule } from '@angular/material/table'
import { CommonModule, DatePipe, NgOptimizedImage } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatButtonModule } from '@angular/material/button'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { PatientInfoViewComponent } from './patient-info-view.component'
import { MatTabsModule } from '@angular/material/tabs'
import { SharedModule } from '../../shared/shared.module'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PatientInfoViewRoutes),
    MatCardModule,
    MatTableModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    DatePipe,
    FormsModule,
    MatTabsModule,
    NgOptimizedImage,
    SharedModule,
  ],
  exports: [
    PatientInfoViewComponent,
    AllergyListPatientComponent,
    DiagnosisListPatientComponent,
    DiseaseListPatientComponent,
    MedicationInTakeListPatientComponent
  ],
  declarations: [
    PatientInfoViewComponent,
    AllergyListPatientComponent,
    DiagnosisListPatientComponent,
    DiseaseListPatientComponent,
    MedicationInTakeListPatientComponent,
    PersonViewComponent
  ],
  providers: []
})
export class PatientInfoViewModule {
}
