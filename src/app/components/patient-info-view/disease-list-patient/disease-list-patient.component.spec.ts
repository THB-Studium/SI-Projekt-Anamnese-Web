import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DiseaseListPatientComponent } from './disease-list-patient.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('DiseaseListPatientComponent', () => {
  let component: DiseaseListPatientComponent
  let fixture: ComponentFixture<DiseaseListPatientComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [
        HttpClientTestingModule,
        DiseaseListPatientComponent
    ]
})
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseListPatientComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  // it('should create', () => {
  //   expect(component).toBeTruthy()
  // })
})
