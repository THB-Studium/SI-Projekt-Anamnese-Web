import { ComponentFixture, TestBed } from '@angular/core/testing'

import { HomePersonalComponent } from './home-personal.component'
import { RouterTestingModule } from '@angular/router/testing'

describe('HommePersonalComponent', () => {
  let component: HomePersonalComponent
  let fixture: ComponentFixture<HomePersonalComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [
        RouterTestingModule,
        HomePersonalComponent
    ]
})
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePersonalComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
