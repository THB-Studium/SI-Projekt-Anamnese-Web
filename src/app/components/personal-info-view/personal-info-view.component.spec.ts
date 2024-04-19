import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PersonalInfoViewComponent } from './personal-info-view.component'
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { PersonListComponent } from './person-list/person-list.component'
import { DiagnosisListComponent } from './diagnosis-list/diagnosis-list.component'
import { AppConfigService } from '../../core/app-config.service'
import { PersonService } from '../../services/person.service'
import { MatTableModule } from '@angular/material/table'
import { MatSnackBarModule } from '@angular/material/snack-bar'

describe('PersonalInfoViewComponent', () => {
  let component: PersonalInfoViewComponent
  let fixture: ComponentFixture<PersonalInfoViewComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PersonalInfoViewComponent, PersonListComponent, DiagnosisListComponent,
      ],
      imports: [
        HttpClientTestingModule, MatTableModule, RouterTestingModule, MatSnackBarModule
      ],
      providers: [
        AppConfigService, PersonService
      ]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalInfoViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  // it('should create', () => {
  //   expect(component).toBeTruthy()
  // })
})
