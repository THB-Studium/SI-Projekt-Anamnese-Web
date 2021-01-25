import { Component, Input, OnInit } from '@angular/core'
import { v4 as uuid } from 'uuid'
import { DiseaseService } from '../../services/disease.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatDialog } from '@angular/material/dialog'
import { DeleteConfirmationComponent } from '../../../shared/dialogs/delete-confirmation-modal/delete-confirmation.component'
import { IDeleteConfirmation } from '../../../model/delete-confirmation.interface'
import { IDisease } from '../../../model/disease.interface'
import { DiseaseModalComponent } from '../../../shared/dialogs/disease-modal/disease-modal.component'
import { IPerson } from '../../../model/person.interface'
import { IllnessService } from '../../services/illness.service'

@Component({
  selector: 'app-disease-list',
  templateUrl: './disease-list.component.html',
  styleUrls: ['./disease-list.component.css']
})
export class DiseaseListComponent implements OnInit {
  displayedColumns: string[] = ['#', 'patient', 'preExistingIllness', 'undergoneSurgery', 'surgeryReason', 'action']
  diseasesList: Array<IDisease> = []
  @Input() patientsList: Array<IPerson> = []

  constructor(
    private diseaseService: DiseaseService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.listDisease()
  }

  onAddNewOrEdit(disease?: IDisease): void {
    const dialogRef = this.dialog.open(DiseaseModalComponent, {
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
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
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
    this.diseaseService.getAll().subscribe((diseases: any) => {
        this.diseasesList = diseases
      },
      err => {
        console.log('Error in DiseaseListComponent.listDisease()')
        console.log(err)
        this.snackBar.open('Could not fetch diseases', 'Close', {
          duration: 4000
        })
      }
    )
  }

  private deleteDisease(diseaseId: uuid): void {
    this.diseaseService.delete(diseaseId).subscribe(() => {
        this.listDisease()
      },
      err => {
        console.log('Error in DiseaseListComponent.deleteDisease()')
        console.log(err)
        this.snackBar.open('Could not delete disease', 'Close', {
          duration: 4000
        })
      }
    )
  }

}
