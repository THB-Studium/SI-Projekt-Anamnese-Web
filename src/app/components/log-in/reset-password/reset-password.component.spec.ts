import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ResetPasswordComponent } from './reset-password.component'
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatCardModule } from '@angular/material/card'
import { MatTabsModule } from '@angular/material/tabs'
import { MatSnackBarModule } from '@angular/material/snack-bar'

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent
  let fixture: ComponentFixture<ResetPasswordComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [
        RouterTestingModule, HttpClientTestingModule, CommonModule,
        MatCardModule, MatTabsModule, MatSnackBarModule, FormsModule,
        ReactiveFormsModule,
        ResetPasswordComponent
    ]
})
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
