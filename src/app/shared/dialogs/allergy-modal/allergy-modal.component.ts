import { Component, Inject, OnInit } from '@angular/core'
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog'
import { IAllergy, IAllergyTO, IPerson } from '../../../model/person.interface'
import { AllergyService } from '../../../components/services/allergy.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar'
import { PersonService } from '../../../components/services/person.service'
import { allergyValues } from '../../constante'
import { FilterService } from '../../../core/filter.service'

@Component({
  selector: 'app-allergy-modal',
  templateUrl: './allergy-modal.component.html',
  styleUrls: ['./allergy-modal.component.css']
})
export class AllergyModalComponent implements OnInit {
  allergyFormGroup: FormGroup
  modalTitle: string
  searching: boolean
  editedMod: boolean
  patient: IPerson = <IPerson>{}
  patientsList: Array<IPerson> = []
  patientsListFiltered: Array<IPerson> = []
  allergies: Array<IAllergy> = []
  allergyValuesList: Array<IAllergy> = []
  allergyValuesFiltered: Array<IAllergy> = []
  allergy: IAllergy = <IAllergy>{}
  allergyTO: IAllergyTO = <IAllergyTO>{allergies: []}

  constructor(
    private _formBuilder: FormBuilder,
    private personService: PersonService,
    private allergyService: AllergyService,
    private filterService: FilterService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AllergyModalComponent>,
    @Inject(MAT_DIALOG_DATA) public receivedData: any,
  ) {
    allergyValues.all.forEach((name: string) => {
      this.allergyValuesList.push(<IAllergy>{name: name})
      this.allergyValuesFiltered.push(<IAllergy>{name: name})
    })
  }

  ngOnInit(): void {
    this.patient = this.receivedData.patient
    this.patientsList = this.receivedData.patientsList
    this.patientsListFiltered = this.receivedData.patientsList

    if (this.patient && this.patient.id) {
      this.allergyTO.patientId = this.patient.id
    }

    if (this.receivedData.update && this.receivedData.update.id) {
      this.editedMod = true
      this.modalTitle = 'Allergie bearbeiten'
      this.allergy = this.receivedData.update
    } else {
      this.editedMod = false
      this.modalTitle = 'Neue Allergie(n) hinzufügen'
    }

    this.formGroupInit()
  }

  applyPatientFilter(filterValue: any): void {
    if (filterValue && filterValue.value.length >= 2) {
      this.patientsListFiltered = this.filterService.searchBy(this.patientsList, filterValue.value, 'firstName')
    } else {
      this.patientsListFiltered = this.patientsList
    }
  }

  displayAutoComplete(patient: IPerson): string {
    return patient ? patient.firstName + ' ' + patient.lastName : ''
  }

  displayAllergyAutoComplete(allergy: IAllergy): string {
    return allergy ? allergy.name : ''
  }

  addAllergy(): void {
    let allergy: any = this.allergyFormGroup.controls.allergyCtrl.value
    if (!allergy.name) {
      allergy = <IAllergy> {id: null, name: allergy}
    }
    this.allergies.push(allergy)
    this.allergyFormGroup.controls.allergyCtrl.setValue('')
  }

  removeAllergy(index: number): void {
    this.allergies.splice(index, 1)
  }

  onSave(): void {
    this.searching = true
    this.editedMod ? this.updateAllergy() : this.createAllergies()
  }

  onNoClick(answerValue: boolean): void {
    this.dialogRef.close({answer: answerValue})
  }

  private createAllergies(): void {
    this.allergies.forEach((allergy: IAllergy) => this.allergyTO.allergies.push(allergy.name))
    console.log(this.allergyTO)
    this.allergyService.add(this.allergyTO.patientId, this.allergyTO).subscribe(() => {
        console.log('New allergies added!')
        this.onNoClick(true)
      },
      err => {
        console.log('Error in AllergyModalComponent.createAllergies()')
        console.log(err)
        this.searching = false
        this.snackBar.open('Could not create allergies', 'Close', {
          duration: 4000
        })
      }
    )
  }

  private updateAllergy(): void {
    // this.allergyService.edit(this.allergies.id, this.allergies).subscribe(() => {
    //     console.log('Medication updated!')
    //     this.onNoClick(true)
    //   },
    //   err => {
    //     console.log('Error in AllergyModalComponent.updateAllergy()')
    //     console.log(err)
    //     this.searching = false
    //     this.snackBar.open('Could not update allergies', 'Close', {
    //       duration: 4000
    //     })
    //   }
    // )
  }

  private formGroupInit(): void {
    this.allergyFormGroup = this._formBuilder.group({
      patientennameCtrl: [{
        value: this.getPatient(), disabled: this.receivedData.parent === 'patient'},
        Validators.required],
      allergyCtrl: [''],
    })

    this.allergyFormGroup.controls.patientennameCtrl.valueChanges.subscribe(
      (value: IPerson) => {
        this.patient = value
        this.allergyTO.patientId = value.id
        this.allergies = value.allergies
      }
    )

  }

  private getPatient(): IPerson {
    if (this.receivedData.parent === 'patient') {
      this.allergies = this.receivedData.patient.allergies
      return this.receivedData.patient
    } else {
      return null
    }
  }

}
