import { Routes } from '@angular/router'
import { rootingPaths } from '../../shared/const/rooting-paths'
import { AdmissionComponent } from './admission/admission.component'
import { HomePersonalComponent } from './home-personal.component'


export const HomePersonalRoutes: Routes = [
  {path: rootingPaths.home_personal, component: HomePersonalComponent},
  {path: rootingPaths.aufnahme, component: AdmissionComponent}
]
