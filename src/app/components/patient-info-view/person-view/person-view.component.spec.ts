import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PersonViewComponent } from './person-view.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

describe('PersonViewComponent', () => {
  let component: PersonViewComponent
  let fixture: ComponentFixture<PersonViewComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [
        FormsModule, ReactiveFormsModule,
        PersonViewComponent
    ]
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
