import { ComponentFixture, TestBed } from '@angular/core/testing'

import { HomePatientComponent } from './home-patient.component'
import { SessionService } from '../../core/authentification-and-authority/session.service'
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { CommonModule } from '@angular/common'
import { MatCardModule } from '@angular/material/card'
import { MatTabsModule } from '@angular/material/tabs'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

describe('HomeComponent', () => {
  let component: HomePatientComponent
  let fixture: ComponentFixture<HomePatientComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePatientComponent],
      imports: [
        RouterTestingModule, HttpClientTestingModule, CommonModule,
        MatCardModule, MatTabsModule, MatSnackBarModule, FormsModule,
        ReactiveFormsModule
      ],
      providers: [SessionService],
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
