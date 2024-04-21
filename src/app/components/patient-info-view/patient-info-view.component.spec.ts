import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PatientInfoViewComponent } from './patient-info-view.component'
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { AppConfigService } from '../../core/app-config.service'
import { SessionService } from '../../core/authentification-and-authority/session.service'
import { PersonService } from '../../services/person.service'
import { MatSnackBarModule } from '@angular/material/snack-bar'

describe('PatientInfoViewComponent', () => {
  let component: PatientInfoViewComponent
  let fixture: ComponentFixture<PatientInfoViewComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [
        RouterTestingModule, HttpClientTestingModule, MatSnackBarModule,
        PatientInfoViewComponent
    ],
    providers: [
        AppConfigService, SessionService, PersonService
    ]
})
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientInfoViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
