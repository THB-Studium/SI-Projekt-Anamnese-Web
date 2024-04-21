import { ComponentFixture, TestBed } from '@angular/core/testing'

import { HomePatientComponent } from './home-patient.component'
import { SessionService } from '../../core/authentification-and-authority/session.service'
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { CommonModule } from '@angular/common'
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card'
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs'
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

describe('HomeComponent', () => {
  let component: HomePatientComponent
  let fixture: ComponentFixture<HomePatientComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [
        RouterTestingModule, HttpClientTestingModule, CommonModule,
        MatCardModule, MatTabsModule, MatSnackBarModule, FormsModule,
        ReactiveFormsModule,
        HomePatientComponent
    ],
    providers: [SessionService]
})
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePatientComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  // it('should create', () => {
  //   expect(component).toBeTruthy()
  // })
})
