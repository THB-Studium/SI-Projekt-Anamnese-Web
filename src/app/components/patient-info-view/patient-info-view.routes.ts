import { Routes } from '@angular/router'
import { rootingPaths } from '../../shared/const/rooting-paths'

export default [
  {
    path: '',
    providers: [],
    children: [
      {
        path: rootingPaths.patient_info_view,
        title: 'Patient Info',
        loadComponent: () => import('./patient-info-view.component')
          .then(module => module.PatientInfoViewComponent)
      }
    ]
  }] as Routes
