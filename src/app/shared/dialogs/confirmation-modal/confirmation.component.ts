import { Component, Input, OnInit, TemplateRef } from '@angular/core'
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button';
import { NgTemplateOutlet } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-confirmation',
    templateUrl: './confirmation.component.html',
    styleUrls: ['./confirmation.component.css'],
    standalone: true,
    imports: [MatIconModule, MatDialogModule, NgTemplateOutlet, MatButtonModule]
})
export class ConfirmationComponent implements OnInit {
  @Input() bodyTemplate: TemplateRef<any>
  @Input() headerTemplate: TemplateRef<any>
  @Input() negativeAnswerTemplate: TemplateRef<any>
  @Input() positiveAnswerTemplate: TemplateRef<any>

  constructor(
    private dialogRef: MatDialogRef<ConfirmationComponent>
  ) {
  }

  closeDialog(result: boolean): void {
    this.dialogRef.close(result)
  }

  ngOnInit(): void {
  }

}
