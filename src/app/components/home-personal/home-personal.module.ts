import { NgModule } from '@angular/core'
import { CommonModule, NgOptimizedImage } from '@angular/common'
import { RouterModule } from '@angular/router'
import { HomePersonalRoutes } from './home-personal.routes'
import { HomePersonalComponent } from './home-personal.component'
import { AdmissionComponent } from './admission/admission.component'
import { SharedModule } from '../../shared/shared.module'


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(HomePersonalRoutes),
    NgOptimizedImage,
  ],
  exports: [
    HomePersonalComponent,
    AdmissionComponent
  ],
  declarations: [
    HomePersonalComponent,
    AdmissionComponent
  ]
})
export class HomePersonalModule {
}
