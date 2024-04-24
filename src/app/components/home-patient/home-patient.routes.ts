import { Routes } from '@angular/router'
import { rootingPaths } from '../../shared/const/rooting-paths'


export default [
  {
    path: '',
    providers: [],
    children: [
      {
        path: rootingPaths.home_patient,
        title: 'Patient Home',
        loadComponent: () => import('./home-patient.component')
          .then(module => module.HomePatientComponent)
      }
    ]
  }] as Routes
