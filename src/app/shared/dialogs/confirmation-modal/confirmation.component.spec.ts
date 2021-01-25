import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { ConfirmationComponent } from './confirmation.component'

describe('ConfirmationComponent', () => {
    let component: ConfirmationComponent
    let fixture: ComponentFixture<ConfirmationComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ConfirmationComponent],
            imports: [
                BrowserAnimationsModule,
                MatDialogModule,
                MatIconModule
            ],
            providers: [{ provide: MatDialogRef, useValue: {} }]
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
