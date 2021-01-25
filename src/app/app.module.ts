import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { BackgroundComponent } from './components/background/background.component'
import { MatTabsModule } from '@angular/material/tabs'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AdmissionComponent } from './components/admission/admission.component'
import { HomePatientComponent } from './components/home-patient/home-patient.component'
import { HeaderComponent } from './components/header/header.component'
import { LogInComponent } from './components/log-in/log-in.component'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatCardModule } from '@angular/material/card'
import { LoginService } from './components/log-in/login.service'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppConfigService } from './core/app-config.service'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { CommonModule } from '@angular/common'
import { MatInputModule } from '@angular/material/input'
import { HomePersonalComponent } from './components/home-personal/home-personal.component'
import { MatTooltipModule } from '@angular/material/tooltip'
import { PatientInfoViewComponent } from './components/patient-info-view/patient-info-view.component'
import { PersonalInfoViewComponent } from './components/personal-info-view/personal-info-view.component'
import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { DiagnosisListComponent } from './components/personal-info-view/diagnosis-list/diagnosis-list.component'
import { PersonListComponent } from './components/personal-info-view/person-list/person-list.component'
import { ResetPasswordComponent } from './components/log-in/reset-password/reset-password.component'
import { MatTableModule } from '@angular/material/table'
import { DiseaseListComponent } from './components/personal-info-view/disease-list/disease-list.component'
import { MatButtonModule } from '@angular/material/button'
import { MatStepperModule } from '@angular/material/stepper'
import { MatSelectModule } from '@angular/material/select'
import { AllergyListComponent } from './components/personal-info-view/allergy-list/allergy-list.component'
import { MedicationInTakeListComponent } from './components/personal-info-view/medication-in-take-list/medication-in-take-list.component'
import { MyProfileModalComponent } from './components/home-patient/my-profile-modal/my-profile-modal.component'
import { MatDialogModule } from '@angular/material/dialog'
import { MatDividerModule } from '@angular/material/divider'
import { AllergyListPatientComponent } from './components/patient-info-view/allergy-list-Patient/allergy-list-patient.component'
import { DiagnosisListPatientComponent } from './components/patient-info-view/diagnosis-list-patient/diagnosis-list-patient.component'
import { DiseaseListPatientComponent } from './components/patient-info-view/disease-list-patient/disease-list-patient.component'
import { MedicationInTakeListPatientComponent } from './components/patient-info-view/medication-in-take-list-patient/medication-in-take-list-patient.component'
import { AuthInterceptor } from './core/authentification-and-authority/auth.Interceptor'
import { AuthGuard } from './core/auth.guard'
import { DeleteConfirmationComponent } from './shared/dialogs/delete-confirmation-modal/delete-confirmation.component'
import { ConfirmationComponent } from './shared/dialogs/confirmation-modal/confirmation.component'
import { AllergyModalComponent } from './shared/dialogs/allergy-modal/allergy-modal.component'
import { DiagnosisModalComponent } from './shared/dialogs/diagnosis-modal/diagnosis-modal.component'
import { DiseaseModalComponent } from './shared/dialogs/disease-modal/disease-modal.component'
import { MedicationInTakeModalComponent } from './shared/dialogs/medication-in-take-modal/medication-in-take-modal.component'
import { StartNewRegistrationModalComponent } from './shared/dialogs/start-new-registration-modal/start-new-registration-modal.component'
import { PersonViewComponent } from './components/patient-info-view/person-view/person-view.component'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatAutocompleteModule } from '@angular/material/autocomplete'


const angularMaterialModules = [
  MatFormFieldModule, MatInputModule, MatIconModule, MatCardModule, MatSnackBarModule,
  MatTooltipModule, MatTabsModule, MatTableModule, MatButtonModule, MatDialogModule,
  MatStepperModule, MatSelectModule, MatDividerModule, MatDatepickerModule,
  MatNativeDateModule, MatSlideToggleModule, MatButtonToggleModule, MatAutocompleteModule,
]

@NgModule({
  declarations: [
    AppComponent,
    AdmissionComponent,
    HomePatientComponent,
    HeaderComponent,
    LogInComponent,
    HomePersonalComponent,
    PatientInfoViewComponent,
    PersonalInfoViewComponent,
    PersonListComponent,
    DiagnosisListComponent,
    DiseaseListComponent,
    ResetPasswordComponent,
    AllergyListComponent,
    MedicationInTakeListComponent,
    BackgroundComponent,
    MyProfileModalComponent,
    AllergyListPatientComponent,
    DiagnosisListPatientComponent,
    DiseaseListPatientComponent,
    MedicationInTakeListPatientComponent,
    DeleteConfirmationComponent,
    ConfirmationComponent,
    AllergyModalComponent,
    DiagnosisModalComponent,
    DiseaseModalComponent,
    MedicationInTakeModalComponent,
    StartNewRegistrationModalComponent,
    PersonViewComponent
  ],

  imports: [
    angularMaterialModules,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule, CommonModule
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    angularMaterialModules,
    LoginService,
    AppConfigService,
    AuthGuard,

  ],

  entryComponents: [
    MyProfileModalComponent,
    ConfirmationComponent,
    DeleteConfirmationComponent,
    MyProfileModalComponent,
    StartNewRegistrationModalComponent
  ],

  bootstrap: [AppComponent]
})

export class AppModule {
}
