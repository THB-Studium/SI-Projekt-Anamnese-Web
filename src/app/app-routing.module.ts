import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomePatientComponent } from './components/home-patient/home-patient.component'
import { AdmissionComponent } from './components/admission/admission.component'
import { LogInComponent } from './components/log-in/log-in.component'
import { HomePersonalComponent } from './components/home-personal/home-personal.component'
import { rootingPath } from './shared/rooting-path'
import { PatientInfoViewComponent } from './components/patient-info-view/patient-info-view.component'
import { PersonalInfoViewComponent } from './components/personal-info-view/personal-info-view.component'
import { ResetPasswordComponent } from './components/log-in/reset-password/reset-password.component'

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/' + rootingPath.login},
  {path: rootingPath.login, component: LogInComponent},
  {path: rootingPath.reset_password, component: ResetPasswordComponent},
  {path: rootingPath.home_patient, component: HomePatientComponent},
  {path: rootingPath.home_personal, component: HomePersonalComponent},
  {path: rootingPath.aufnahme, component: AdmissionComponent},
  {path: rootingPath.patient_info_view, component: PatientInfoViewComponent},
  {path: rootingPath.personal_info_view, component: PersonalInfoViewComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
