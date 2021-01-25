import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MedicationInTakeModalComponent } from './medication-in-take-modal.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

describe('MedicationInTakeModalComponent', () => {
  let component: MedicationInTakeModalComponent
  let fixture: ComponentFixture<MedicationInTakeModalComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MedicationInTakeModalComponent],
      imports: [
        FormsModule, ReactiveFormsModule
      ],
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicationInTakeModalComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  // it('should create', () => {
  //   expect(component).toBeTruthy()
  // })
})
