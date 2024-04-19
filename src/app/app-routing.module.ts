import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LogInComponent } from './components/log-in/log-in.component'
import { rootingPaths } from './shared/const/rooting-paths'
import { ResetPasswordComponent } from './components/log-in/reset-password/reset-password.component'
import { AuthGuard } from './core/authentification-and-authority/auth.guard'

const routes: Routes = [{path: '', pathMatch: 'full', redirectTo: rootingPaths.login},

  {path: rootingPaths.login, component: LogInComponent},
  {path: rootingPaths.reset_password, component: ResetPasswordComponent},

  {
    path: '',
    canActivate: [AuthGuard],
    children: [{
      path: '',
      loadChildren: () => import('src/app/components/home-patient/home-patient.module')
        .then(module => module.HomePatientModule)
    }]
  },

  {
    path: '',
    canActivate: [AuthGuard],
    children: [{
      path: '',
      loadChildren: () => import('src/app/components/patient-info-view/patient-info-view.module')
        .then(module => module.PatientInfoViewModule)
    }]
  },

  {
    path: '',
    canActivate: [AuthGuard],
    children: [{
      path: '',
      loadChildren: () => import('src/app/components/home-personal/home-personal.module')
        .then(module => module.HomePersonalModule)
    }]
  },

  {
    path: '',
    canActivate: [AuthGuard],
    children: [{
      path: '', loadChildren: () => import('src/app/components/personal-info-view/personal-info-view.module')
        .then(module => module.PersonalInfoViewModule)
    }]
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
