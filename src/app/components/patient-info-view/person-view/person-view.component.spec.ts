import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PersonViewComponent } from './person-view.component'
import { RouterTestingModule } from '@angular/router/testing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

describe('PersonViewComponent', () => {
  let component: PersonViewComponent
  let fixture: ComponentFixture<PersonViewComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonViewComponent],
      imports: [
        FormsModule, ReactiveFormsModule
      ],
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  // it('should create', () => {
  //   expect(component).toBeTruthy()
  // })
})
