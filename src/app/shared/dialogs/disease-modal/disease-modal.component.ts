import { Component, Inject, OnInit } from '@angular/core'
import { IDisease, IDiseaseTO } from '../../../model/disease.interface'
import { IPerson } from '../../../model/person.interface'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DiseaseService } from '../../../services/disease.service'
import { IIllness } from '../../../model/illness.interface'
import { FilterService } from '../../../core/filter.service'
import { IllnessService } from '../../../services/illness.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-disease-modal',
  templateUrl: './disease-modal.component.html',
  styleUrls: ['./disease-modal.component.css']
})
export class DiseaseModalComponent implements OnInit {
  diseaseFormGroup: FormGroup
  modalTitle: string

  searching: boolean
  editedMod: boolean
  illnessValues: Array<IIllness> = []
  illnessValuesFiltered: Array<IIllness> = []
  preExistingIllnessesList: Array<IIllness> = []
  patient: IPerson = <IPerson>{}
  patientsList: Array<IPerson> = []
  patientsListFiltered: Array<IPerson> = []
  disease: IDisease = <IDisease>{}
  diseaseTO: IDiseaseTO = <IDiseaseTO>{}

  constructor(
    private _formBuilder: FormBuilder,
    private diseaseService: DiseaseService,
    private illnessService: IllnessService,
    private filterService: FilterService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DiseaseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public receivedData: any
  ) {
  }

  ngOnInit(): void {
    this.patient = this.receivedData.patient
    this.patientsList = this.receivedData.patientsList
    this.patientsListFiltered = this.receivedData.patientsList
    this.editedMod = this.receivedData?.update?.id

    if (this.patient?.id) {
      this.diseaseTO.patientId = this.patient.id
    }

    if (this.editedMod) {
      this.modalTitle = 'Erkrankung bearbeiten'
      this.disease = this.receivedData.update
      this.preExistingIllnessesList = this.disease.preExistingIllnesses
    } else {
      this.modalTitle = 'Neue Erkrankung(en) hinzufügen'
    }

    this.listIllnesses()
    this.formGroupInit()
  }

  applyPatientFilter(filterValue: any): void {
    filterValue?.value?.length >= 2
      ? this.patientsListFiltered = this.filterService.searchBy(this.patientsList, filterValue.value, 'firstName')
      : this.patientsListFiltered = this.patientsList
  }

  applyIllnessFilter(filterValue: any): void {
    filterValue?.value?.length >= 2
      ? this.illnessValuesFiltered = this.filterService.searchBy(this.illnessValues, filterValue.value, 'name')
      : this.illnessValuesFiltered = this.illnessValues
  }

  addPreExistingIllnesses(): void {
    let illness: any = this.diseaseFormGroup.controls.preExistingIllnessesCtrl.value
    if (!illness.id) {
      illness = <IIllness>{id: null, name: illness}
    }
    this.preExistingIllnessesList.push(illness)
    this.diseaseFormGroup.controls.preExistingIllnessesCtrl.setValue('')
  }

  removePreExistingIllnesses(index: number): void {
    this.preExistingIllnessesList.splice(index, 1)
  }

  onSave(): void {
    this.searching = true
    if (!this.disease.undergoneSurgery) {
      this.diseaseTO.surgeriesDetails = ''
      this.disease.surgeriesDetails = ''
    }
    this.diseaseTO.preExistingIllnesses = this.preExistingIllnessesList
    this.disease.preExistingIllnesses = this.preExistingIllnessesList
    this.editedMod ? this.updateDisease() : this.createDisease()
  }

  onNoClick(dataSaved: boolean): void {
    this.searching = false
    this.dialogRef.close({answer: dataSaved})
  }

  onUndergoneSurgery(event: string): void {
    this.diseaseTO.undergoneSurgery = event === 'true'
    this.disease.undergoneSurgery = event === 'true'
  }

  displayPatientAutoComplete(patient: IPerson): string {
    return patient ? patient.firstName + ' ' + patient.lastName : ''
  }

  displayIllnessAutoComplete(illness: IIllness): string {
    return illness ? illness.name : ''
  }

  private formGroupInit(): void {
    this.diseaseFormGroup = this._formBuilder.group({
      patientennameCtrl: [{
        value: this.getPatient(), disabled: this.receivedData.parent === 'patient'
      }, Validators.required],
      surgeriesDetailsCtrl: [this.editedMod ? this.disease.surgeriesDetails : ''],
      preExistingIllnessesCtrl: [''],
    })

    this.diseaseFormGroup.controls.patientennameCtrl.valueChanges.subscribe(
      (value: IPerson): void => {
        this.patient = value
        this.diseaseTO.patientId = value.id
        this.disease.person = value
      }
    )

    this.diseaseFormGroup.controls.surgeriesDetailsCtrl.valueChanges.subscribe(
      value => {
        this.diseaseTO.surgeriesDetails = value
        this.disease.surgeriesDetails = value
      }
    )

  }

  private createDisease(): void {
    this.diseaseService.add(this.diseaseTO).subscribe((): void => {
        console.log('New disease added!')
        this.onNoClick(true)
      },
      (err: Error): void => {
        console.log('Error in DiseaseModalComponent.createDisease()')
        console.log(err)
        this.searching = false
        this.snackBar.open('Could not create disease', 'Close', {
          duration: 4000
        })
      }
    )
  }

  private updateDisease(): void {
    this.diseaseService.edit(this.disease.id, this.disease).subscribe((): void => {
        console.log('Medication updated!')
        this.onNoClick(true)
      },
      (err: Error): void => {
        console.log('Error in DiseaseModalComponent.updateDisease()')
        console.log(err)
        this.searching = false
        this.snackBar.open('Could not update disease', 'Close', {
          duration: 4000
        })
      }
    )
  }

  private listIllnesses(): void {
    this.illnessService.getAll().subscribe((illnesses: Array<IIllness>): void => {
        this.illnessValues = illnesses
        this.illnessValuesFiltered = illnesses
      },
      (err: Error): void => {
        console.log('Error in DiseaseModalComponent.listIllnesses()')
        console.log(err)
        this.snackBar.open('Could not fetch illnesses', 'Close', {
          duration: 4000
        })
      }
    )
  }

  private getPatient(): IPerson {
    if (this.receivedData.parent === 'patient') {
      return this.receivedData.patient
    }

    if (this.disease?.person) {
      return this.disease.person
    }

    return null
  }

}
