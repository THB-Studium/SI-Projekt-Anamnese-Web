import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { MatLegacyDialogModule as MatDialogModule, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog'
import { MatIconModule } from '@angular/material/icon'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { ConfirmationComponent } from './confirmation.component'

describe('ConfirmationComponent', () => {
    let component: ConfirmationComponent
    let fixture: ComponentFixture<ConfirmationComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
    imports: [
        BrowserAnimationsModule,
        MatDialogModule,
        MatIconModule,
        ConfirmationComponent
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
