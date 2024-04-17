import { Component, Inject } from '@angular/core'
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog'
import { IDeleteConfirmation } from '../../../model/delete-confirmation.interface'

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
