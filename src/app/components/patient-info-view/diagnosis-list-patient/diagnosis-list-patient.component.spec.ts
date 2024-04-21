import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DiagnosisListPatientComponent } from './diagnosis-list-patient.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('DiagnosisListPatientComponent', () => {
  let component: DiagnosisListPatientComponent
  let fixture: ComponentFixture<DiagnosisListPatientComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [
        HttpClientTestingModule,
        DiagnosisListPatientComponent
    ]
})
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosisListPatientComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  // it('should create', () => {
  //   expect(component).toBeTruthy()
  // })
})
