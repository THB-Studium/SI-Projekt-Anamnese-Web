import { Routes } from '@angular/router'
import { rootingPaths } from '../../shared/const/rooting-paths'
import { PersonalInfoViewComponent } from './personal-info-view.component'

export const PersonalInfoViewRoutes: Routes = [
  {path: rootingPaths.personal_info_view, component: PersonalInfoViewComponent}
]
