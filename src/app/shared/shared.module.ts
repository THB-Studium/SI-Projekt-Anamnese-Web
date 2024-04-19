import { NgModule } from '@angular/core'
import { CommonModule, NgOptimizedImage } from '@angular/common'
import { DeleteConfirmationComponent } from './dialogs/delete-confirmation/delete-confirmation.component'
import { ConfirmationComponent } from './dialogs/confirmation-modal/confirmation.component'
import { AllergyModalComponent } from './dialogs/allergy-modal/allergy-modal.component'
import { DiagnosisModalComponent } from './dialogs/diagnosis-modal/diagnosis-modal.component'
import { DiseaseModalComponent } from './dialogs/disease-modal/disease-modal.component'
import { MedicationInTakeModalComponent } from './dialogs/medication-in-take-modal/medication-in-take-modal.component'
import { StartNewRegistrationModalComponent } from './dialogs/start-new-registration-modal/start-new-registration-modal.component'
import { HeaderComponent } from './components/header/header.component'
import { MatDividerModule } from '@angular/material/divider'
import { MatStepperModule } from '@angular/material/stepper'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatInputModule } from '@angular/material/input'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatDialogModule } from '@angular/material/dialog'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { RouterLink } from '@angular/router'
import { MatTooltipModule } from '@angular/material/tooltip'

@NgModule({
  declarations: [
    HeaderComponent,
    DeleteConfirmationComponent,
    ConfirmationComponent,
    AllergyModalComponent,
    DiagnosisModalComponent,
    DiseaseModalComponent,
    MedicationInTakeModalComponent,
    StartNewRegistrationModalComponent,
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatStepperModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
    RouterLink,
    MatTooltipModule,
    NgOptimizedImage
  ],
  exports: [
    HeaderComponent,
    DeleteConfirmationComponent,
    ConfirmationComponent,
    AllergyModalComponent,
    DiagnosisModalComponent,
    DiseaseModalComponent,
    MedicationInTakeModalComponent,
    StartNewRegistrationModalComponent,
  ]
})

export class SharedModule {
}
