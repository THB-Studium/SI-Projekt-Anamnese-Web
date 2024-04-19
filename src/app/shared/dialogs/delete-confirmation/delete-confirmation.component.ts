import { Component, Inject } from '@angular/core'
import { IDeleteConfirmation } from '../../../model/delete-confirmation.interface'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

/**
 *
 * @author Steve Ngalamo (Software Developer Intern)
 *
 */
@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css']
})
export class DeleteConfirmationComponent {

  constructor(
    private dialogRef: MatDialogRef<DeleteConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDeleteConfirmation
  ) {
  }

  /*** to cancel the deleting and close the dialog window ***/
  onNoClick(): void {
    this.dialogRef.close()
  }
}
