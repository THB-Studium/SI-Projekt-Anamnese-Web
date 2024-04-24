import { Routes } from '@angular/router'
import { rootingPaths } from './shared/const/rooting-paths'
import { AuthGuard } from './core/authentification-and-authority/auth.guard'

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: rootingPaths.login},

  {
    path: rootingPaths.login,
    title: 'Log in',
    loadComponent: () => import('./components/log-in/log-in.component')
      .then(module => module.LogInComponent)
  },

  {
    path: rootingPaths.login_item,
    title: 'Reset Password',
    loadComponent: () => import('./components/log-in/reset-password/reset-password.component')
      .then(module => module.ResetPasswordComponent)
  },

  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('src/app/components/home-patient/home-patient.routes')
  },

  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('src/app/components/patient-info-view/patient-info-view.routes')
  },

  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('src/app/components/home-personal/home-personal.routes')
  },

  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('src/app/components/personal-info-view/personal-info-view.routes')
  },
]
