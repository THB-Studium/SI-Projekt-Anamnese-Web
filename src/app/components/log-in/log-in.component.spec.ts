import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LogInComponent } from './log-in.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { LoginService } from './login.service'
import { SessionService } from '../../core/authentification-and-authority/session.service'
import { AppConfigService } from '../../core/app-config.service'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import {MatCardModule} from "@angular/material/card";
import {MatTabsModule} from "@angular/material/tabs";
import {MatSnackBarModule} from "@angular/material/snack-bar";

describe('LogInComponent', () => {
  let component: LogInComponent
  let fixture: ComponentFixture<LogInComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [
        HttpClientTestingModule, CommonModule,
        MatCardModule, MatTabsModule, MatSnackBarModule, FormsModule,
        ReactiveFormsModule,
        LogInComponent
    ],
    providers: [
        LoginService, SessionService, AppConfigService
    ]
})
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
