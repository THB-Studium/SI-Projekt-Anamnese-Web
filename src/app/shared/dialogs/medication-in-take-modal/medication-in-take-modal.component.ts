import { Component, Inject, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { IMedication, IMedicationTO } from '../../../model/medication.interface'
import { IPerson } from '../../../model/person.interface'
import { MedicationService } from '../../../services/medication.service'
import { FilterService } from '../../../core/filter.service'
import { MatInput } from '@angular/material/input'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-medication-in-take-modal',
  templateUrl: './medication-in-take-modal.component.html',
  styleUrls: ['./medication-in-take-modal.component.css']
})
export class MedicationInTakeModalComponent implements OnInit {
  @ViewChild('startDatumInput', {read: MatInput, static: true}) startDatumInput: MatInput
  medicamentInTakeFormGroup: FormGroup
  modalTitle: string
  startDatumCtrl: FormControl

  searching: boolean
  editedMod: boolean
  patient: IPerson = <IPerson>{}
  patientsList: Array<IPerson> = []
  patientsListFiltered: Array<IPerson> = []
  medication: IMedication = <IMedication>{}
  medicationTO: IMedicationTO = <IMedicationTO>{bloodDiluent: false}

  constructor(
    private _formBuilder: FormBuilder,
    private medicationService: MedicationService,
    private filterService: FilterService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<MedicationInTakeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public receivedData: any
  ) {
  }

  ngOnInit(): void {
    this.patient = this.receivedData.patient
    this.patientsList = this.receivedData.patientsList
    this.patientsListFiltered = this.receivedData.patientsList

    if (this.patient && this.patient.id) {
      this.medicationTO.patientId = this.patient.id
    }

    if (this.receivedData.update && this.receivedData.update.id) {
      this.editedMod = true
      this.modalTitle = 'Medikamenteneinnahme bearbeiten'
      this.medication = this.receivedData.update
    } else {
      this.editedMod = false
      this.modalTitle = 'Neue Medikamenteneinnahme hinzufügen'
    }

    this.formGroupInit()
  }

  onSave(): void {
    this.searching = true
    this.editedMod ? this.updateMedication() : this.createMedication()
  }

  onNoClick(dataSaved: boolean): void {
    this.searching = false
    this.dialogRef.close({answer: dataSaved})
  }

  onBlutverduennungsmittel(event: string): void {
    this.medicationTO.bloodDiluent = event === 'true'
    this.medication.bloodDiluent = event === 'true'
  }

  applyPatientFilter(filterValue: any): void {
    this.patientsListFiltered = filterValue && filterValue.value.length >= 2
      ? this.filterService.searchBy(this.patientsList, filterValue.value, 'firstName')
      : this.patientsList
  }

  displayAutoComplete(patient: IPerson): string {
    return patient
      ? patient.firstName + ' ' + patient.lastName
      : ''
  }

  private formGroupInit(): void {
    this.startDatumCtrl = new FormControl(
      {value: this.editedMod ? this.medication.startDate : '', disabled: true}
    )
    this.startDatumCtrl.valueChanges.subscribe(value => {
      this.medicationTO.startDate = new Date(value)
      this.medication.startDate = new Date(value)
    })

    this.medicamentInTakeFormGroup = this._formBuilder.group({
      patientennameCtrl: [{
        value: this.getPatientName(),
        disabled: this.receivedData.parent === 'patient'
      },
        Validators.required],
      medikamentnameCtrl: [this.editedMod ? this.medication.designation : '', Validators.required],
      dosierungCtrl: [this.editedMod ? this.medication.dosage : '', Validators.required],
    })

    this.medicamentInTakeFormGroup.controls.patientennameCtrl.valueChanges.subscribe(
      (value: IPerson): void => {
        this.patient = value
        this.medicationTO.patientId = value.id
        this.medication.person = value
      }
    )

    this.medicamentInTakeFormGroup.controls.medikamentnameCtrl.valueChanges.subscribe(
      value => {
        this.medicationTO.designation = value
        this.medication.designation = value
      }
    )

    this.medicamentInTakeFormGroup.controls.dosierungCtrl.valueChanges.subscribe(
      value => {
        this.medicationTO.dosage = value
        this.medication.dosage = value
      }
    )

  }

  private createMedication(): void {
    this.medicationService.add(this.medicationTO).subscribe((): void => {
        console.log('New medication added!')
        this.onNoClick(true)
      },
      (err: Error): void => {
        console.log('Error in MedicationInTakeModalComponent.createMedication()')
        console.log(err)
        this.searching = false
        this.snackBar.open('Could not create medication', 'Close', {
          duration: 4000
        })
      }
    )
  }

  private updateMedication(): void {
    this.medicationService.edit(this.medication.id, this.medication).subscribe((): void => {
        console.log('Medication updated!')
        this.onNoClick(true)
      },
      (err: Error): void => {
        console.log('Error in MedicationInTakeModalComponent.updateMedication()')
        console.log(err)
        this.searching = false
        this.snackBar.open('Could not update medication', 'Close', {
          duration: 4000
        })
      }
    )
  }

  private getPatientName(): IPerson {
    return this.receivedData.parent === 'patient'
      ? this.receivedData.patient
      : this.medication && this.medication.person ? this.medication.person : null
  }

}
