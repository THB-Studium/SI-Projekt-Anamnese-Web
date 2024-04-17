import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MedicationInTakeListPatientComponent } from './medication-in-take-list-patient.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('MedicationInTakeListPatientComponent', () => {
  let component: MedicationInTakeListPatientComponent
  let fixture: ComponentFixture<MedicationInTakeListPatientComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MedicationInTakeListPatientComponent],
      imports: [
        HttpClientTestingModule
      ],
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicationInTakeListPatientComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  // it('should create', () => {
  //   expect(component).toBeTruthy()
  // })
})
