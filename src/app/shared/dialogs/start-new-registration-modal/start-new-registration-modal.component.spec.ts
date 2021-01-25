import { ComponentFixture, TestBed } from '@angular/core/testing'

import { StartNewRegistrationModalComponent } from './start-new-registration-modal.component'

describe('NewRegistrationModalComponent', () => {
  let component: StartNewRegistrationModalComponent
  let fixture: ComponentFixture<StartNewRegistrationModalComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StartNewRegistrationModalComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(StartNewRegistrationModalComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  // it('should create', () => {
  //   expect(component).toBeTruthy()
  // })
})
