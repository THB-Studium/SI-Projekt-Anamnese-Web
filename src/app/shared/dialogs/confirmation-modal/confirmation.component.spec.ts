import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing'
import {MatIconModule} from '@angular/material/icon'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

import {ConfirmationComponent} from './confirmation.component'
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";

describe('ConfirmationComponent', () => {
  let component: ConfirmationComponent
  let fixture: ComponentFixture<ConfirmationComponent>

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatDialogModule,
        MatIconModule,
        ConfirmationComponent
      ],
      providers: [{provide: MatDialogRef, useValue: {}}]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  // it('should create', () => {
  //     expect(component).toBeTruthy()
  // })
})
