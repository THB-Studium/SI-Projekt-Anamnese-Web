import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { DeleteConfirmationComponent } from './delete-confirmation.component'
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog'

describe('DeleteConfirmationComponent', () => {
  let component: DeleteConfirmationComponent
  let fixture: ComponentFixture<DeleteConfirmationComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteConfirmationComponent],
      imports: [
        MatDialogModule
      ],
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteConfirmationComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  // it('should create', () => {
  //   expect(component).toBeTruthy()
  // })
})
