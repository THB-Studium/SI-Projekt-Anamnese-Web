import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MedicationInTakeListComponent } from './medication-in-take-list.component'

describe('MedicationInTakeListComponent', () => {
  let component: MedicationInTakeListComponent
  let fixture: ComponentFixture<MedicationInTakeListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicationInTakeListComponent ],
      imports: [
        // DynamicTestModule, HttpClientTestingModule
      ],
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicationInTakeListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  // it('should create', () => {
  //   expect(component).toBeTruthy()
  // })
})
