import { NgModule } from '@angular/core'
import { CommonModule, NgOptimizedImage } from '@angular/common'
import { RouterModule } from '@angular/router'
import { HomePatientRoutes } from './home-patient.routes'
import { MyProfileModalComponent } from './my-profile-modal/my-profile-modal.component'
import { HomePatientComponent } from './home-patient.component'
import { MatIconModule } from '@angular/material/icon'
import { FormsModule } from '@angular/forms'
import { MatDividerModule } from '@angular/material/divider'
import { MatButtonModule } from '@angular/material/button'
import { MatTooltipModule } from '@angular/material/tooltip'
import { PatientInfoViewModule } from '../patient-info-view/patient-info-view.module'
import { SharedModule } from '../../shared/shared.module'


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(HomePatientRoutes),
    PatientInfoViewModule,
    MatIconModule,
    NgOptimizedImage,
    FormsModule,
    MatDividerModule,
    MatButtonModule,
    MatTooltipModule,
    SharedModule,
  ],
  exports: [
    HomePatientComponent,
    MyProfileModalComponent
  ],
  declarations: [
    HomePatientComponent,
    MyProfileModalComponent
  ]
})
export class HomePatientModule {
}
