import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DiagnosisListComponent } from './diagnosis-list.component'

describe('DiagnosisListComponent', () => {
  let component: DiagnosisListComponent
  let fixture: ComponentFixture<DiagnosisListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [DiagnosisListComponent]
})
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosisListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  // it('should create', () => {
  //   expect(component).toBeTruthy()
  // })
})
