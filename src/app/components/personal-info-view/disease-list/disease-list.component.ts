import { Component, Input, OnInit } from '@angular/core'
import { v4 as uuid } from 'uuid'
import { DiseaseService } from '../../../services/disease.service'
import { IDeleteConfirmation } from '../../../model/delete-confirmation.interface'
import { IDisease } from '../../../model/disease.interface'
import { DiseaseModalComponent } from '../../../shared/dialogs/disease-modal/disease-modal.component'
import { IPerson } from '../../../model/person.interface'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { DeleteConfirmationComponent } from '../../../shared/dialogs/delete-confirmation/delete-confirmation.component'
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-disease-list',
    templateUrl: './disease-list.component.html',
    styleUrls: ['./disease-list.component.css'],
    standalone: true,
    imports: [MatCardModule, MatTableModule, NgFor, MatButtonModule, MatTooltipModule, MatIconModule]
})
export class DiseaseListComponent implements OnInit {
  displayedColumns: Array<string> = ['#', 'patient', 'preExistingIllness', 'undergoneSurgery', 'surgeryReason', 'action']
  diseasesList: Array<IDisease> = []
  @Input() patientsList: Array<IPerson> = []

  constructor(
    private diseaseService: DiseaseService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.listDisease()
  }

  onAddNewOrEdit(disease?: IDisease): void {
    const dialogRef: MatDialogRef<DiseaseModalComponent> = this.dialog.open(DiseaseModalComponent, {
      width: '750px',
      data: {update: disease, parent: 'personal', patientsList: this.patientsList}
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.answer) {
        this.listDisease()
      }
    })
  }

  onDelete(disease: IDisease): void {
    const dialogRef: MatDialogRef<DeleteConfirmationComponent> = this.dialog.open(DeleteConfirmationComponent, {
      disableClose: true,
      data: <IDeleteConfirmation>{entityType: 'Disease', entityName: ''}
    })

    dialogRef.afterClosed().subscribe(answer => {
      if (answer) {
        this.deleteDisease(disease.id)
      }
    })
  }


  private listDisease(): void {
    this.diseaseService.getAll().subscribe((diseases: any): void => {
        this.diseasesList = diseases
      },
      (err: Error): void => {
        console.log('Error in DiseaseListComponent.listDisease()')
        console.log(err)
        this.snackBar.open('Could not fetch diseases', 'Close', {
          duration: 4000
        })
      }
    )
  }

  private deleteDisease(diseaseId: uuid): void {
    this.diseaseService.delete(diseaseId).subscribe((): void => {
        this.listDisease()
      },
      (err: Error): void => {
        console.log('Error in DiseaseListComponent.deleteDisease()')
        console.log(err)
        this.snackBar.open('Could not delete disease', 'Close', {
          duration: 4000
        })
      }
    )
  }

}
