import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AllergyModalComponent } from './allergy-modal.component'
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog'

describe('AllergyModalComponent', () => {
  let component: AllergyModalComponent
  let fixture: ComponentFixture<AllergyModalComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllergyModalComponent],
      imports: [
        MatDialogModule
      ],
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AllergyModalComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  // it('should create', () => {
  //   expect(component).toBeTruthy()
  // })
})
