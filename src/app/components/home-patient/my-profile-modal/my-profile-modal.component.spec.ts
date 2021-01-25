import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MyProfileModalComponent } from './my-profile-modal.component'
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { HeaderComponent } from '../../header/header.component'

describe('MyProfileModalComponent', () => {
  let component: MyProfileModalComponent
  let fixture: ComponentFixture<MyProfileModalComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyProfileModalComponent, HeaderComponent],
      imports: [
        MatDialogModule, MatIconModule
      ],
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProfileModalComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  // it('should create', () => {
  //   expect(component).toBeTruthy()
  // })

})
