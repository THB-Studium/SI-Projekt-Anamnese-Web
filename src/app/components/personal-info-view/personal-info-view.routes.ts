import { Routes } from '@angular/router'
import { rootingPaths } from '../../shared/const/rooting-paths'

export default [
  {
    path: '',
    providers: [],
    children: [
      {
        path: rootingPaths.personal_info_view,
        title: 'Personal Info',
        loadComponent: () => import('./personal-info-view.component')
          .then(module => module.PersonalInfoViewComponent)
      }
    ]
  }] as Routes
