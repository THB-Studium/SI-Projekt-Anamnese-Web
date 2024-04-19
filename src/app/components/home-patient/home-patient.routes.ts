import { Routes } from '@angular/router'
import { rootingPaths } from '../../shared/const/rooting-paths'
import { HomePatientComponent } from './home-patient.component'


export const HomePatientRoutes: Routes = [
  {path: rootingPaths.home_patient, component: HomePatientComponent},
]
