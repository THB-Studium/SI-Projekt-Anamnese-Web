import { Routes } from '@angular/router'
import { rootingPaths } from '../../shared/const/rooting-paths'


export default [
  {
    path: '',
    providers: [],
    children: [
      {
        path: rootingPaths.home_personal,
        title: 'Personal Home',
        loadComponent: () => import('./home-personal.component')
          .then(module => module.HomePersonalComponent)
      },

      {
        path: rootingPaths.aufnahme,
        title: 'New Admission',
        loadComponent: () => import('./admission/admission.component')
          .then(module => module.AdmissionComponent)
      }
    ]
  }] as Routes
