import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AllergyListComponent } from './allergy-list.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('AllergyListComponent', () => {
  let component: AllergyListComponent
  let fixture: ComponentFixture<AllergyListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [
        HttpClientTestingModule,
        AllergyListComponent
    ]
})
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AllergyListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  // it('should create', () => {
  //   expect(component).toBeTruthy()
  // })
})
