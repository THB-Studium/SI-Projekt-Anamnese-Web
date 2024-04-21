import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AllergyListPatientComponent } from './allergy-list-patient.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('AllergyListComponent', () => {
  let component: AllergyListPatientComponent
  let fixture: ComponentFixture<AllergyListPatientComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [
        HttpClientTestingModule,
        AllergyListPatientComponent
    ]
})
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AllergyListPatientComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  // it('should create', () => {
  //   expect(component).toBeTruthy()
  // })
})
