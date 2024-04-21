import { NgModule } from '@angular/core'
import { CommonModule, NgOptimizedImage } from '@angular/common'
import { RouterModule } from '@angular/router'
import { HomePatientRoutes } from './home-patient.routes'
import { MyProfileModalComponent } from './my-profile-modal/my-profile-modal.component'
import { HomePatientComponent } from './home-patient.component'
import { FormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon'
import { SharedModule } from '../../shared/shared.module'


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(HomePatientRoutes),
        FormsModule,
        MatButtonModule,
        MatTooltipModule,
        MatDividerModule,
        MatIconModule,
        NgOptimizedImage,
        HomePatientComponent,
        MyProfileModalComponent
    ],
    exports: [
        HomePatientComponent,
        MyProfileModalComponent
    ]
})
export class HomePatientModule {
}
