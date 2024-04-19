import { NgModule } from '@angular/core'
import { AllergyListComponent } from './allergy-list/allergy-list.component'
import { DiagnosisListComponent } from './diagnosis-list/diagnosis-list.component'
import { DiseaseListComponent } from './disease-list/disease-list.component'
import { MedicationInTakeListComponent } from './medication-in-take-list/medication-in-take-list.component'
import { PersonListComponent } from './person-list/person-list.component'
import { RouterModule } from '@angular/router'
import { PersonalInfoViewRoutes } from './personal-info-view.routes'
import { MatCardModule } from '@angular/material/card'
import { MatTableModule } from '@angular/material/table'
import { CommonModule, LowerCasePipe, NgOptimizedImage } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatButtonModule } from '@angular/material/button'
import { PersonalInfoViewComponent } from './personal-info-view.component'
import { MatTabsModule } from '@angular/material/tabs'
import { AppModule } from '../../app.module'
import { SharedModule } from '../../shared/shared.module'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PersonalInfoViewRoutes),
    MatCardModule,
    MatTableModule,
    LowerCasePipe,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatTabsModule,
    NgOptimizedImage,
    AppModule,
    SharedModule
  ],
  exports: [
    PersonalInfoViewComponent,
    AllergyListComponent,
    DiagnosisListComponent,
    DiseaseListComponent,
    MedicationInTakeListComponent,
    PersonListComponent,
  ],
  declarations: [
    PersonalInfoViewComponent,
    AllergyListComponent,
    DiagnosisListComponent,
    DiseaseListComponent,
    MedicationInTakeListComponent,
    PersonListComponent
  ],
  providers: []
})
export class PersonalInfoViewModule {
}
