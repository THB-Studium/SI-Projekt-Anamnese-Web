import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DiseaseModalComponent } from './disease-modal.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

describe('DiseaseModalComponent', () => {
  let component: DiseaseModalComponent
  let fixture: ComponentFixture<DiseaseModalComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [
        FormsModule, ReactiveFormsModule,
        DiseaseModalComponent
    ]
})
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseModalComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  // it('should create', () => {
  //   expect(component).toBeTruthy()
  // })
})
