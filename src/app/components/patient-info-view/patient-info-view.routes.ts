import { Routes } from '@angular/router'
import { PatientInfoViewComponent } from './patient-info-view.component'
import { rootingPaths } from '../../shared/const/rooting-paths'

export const PatientInfoViewRoutes: Routes = [
  { path: rootingPaths.patient_info_view, component: PatientInfoViewComponent },
]
