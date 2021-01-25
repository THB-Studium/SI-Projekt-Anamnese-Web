import { Component, Input, OnInit, TemplateRef } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'

@Component({
    selector: 'app-confirmation',
    templateUrl: './confirmation.component.html',
    styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
    @Input() bodyTemplate: TemplateRef<any>
    @Input() headerTemplate: TemplateRef<any>
    @Input() negativeAnswerTemplate: TemplateRef<any>
    @Input() positiveAnswerTemplate: TemplateRef<any>

    constructor(
        private dialogRef: MatDialogRef<ConfirmationComponent>
    ) { }

    closeDialog(result: boolean): void {
        this.dialogRef.close(result)
    }

    ngOnInit(): void {
    }

}
