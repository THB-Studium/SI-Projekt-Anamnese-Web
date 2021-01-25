import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DiseaseListComponent } from './disease-list.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { AppConfigService } from '../../../core/app-config.service'

describe('DiseaseListComponent', () => {
  let component: DiseaseListComponent
  let fixture: ComponentFixture<DiseaseListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiseaseListComponent ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
      AppConfigService
    ]
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  // it('should create', () => {
  //   expect(component).toBeTruthy()
  // })
})
