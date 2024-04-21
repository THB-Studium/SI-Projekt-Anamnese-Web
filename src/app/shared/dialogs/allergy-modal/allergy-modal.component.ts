import { Component, Inject, OnInit } from '@angular/core'
import { IAllergy, IAllergyTO, IPerson } from '../../../model/person.interface'
import { AllergyService } from '../../../services/allergy.service'
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'
import { PersonService } from '../../../services/person.service'
import { allergyValues } from '../../const/constante'
import { FilterService } from '../../../core/filter.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { NgFor, NgIf } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';

@Component({
    selector: 'app-allergy-modal',
    templateUrl: './allergy-modal.component.html',
    styleUrls: ['./allergy-modal.component.css'],
    standalone: true,
    imports: [MatDividerModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, NgFor, MatOptionModule, MatButtonModule, NgIf]
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
    this.editedMod = this.receivedData.update?.id

    if (this.patient?.id) {
      this.allergyTO.patientId = this.patient.id
    }

    if (this.editedMod) {
      this.modalTitle = 'Allergie bearbeiten'
      this.allergy = this.receivedData.update
    } else {
      this.modalTitle = 'Neue Allergie(n) hinzufügen'
    }

    this.formGroupInit()
  }

  applyPatientFilter(filterValue: any): void {
    filterValue.value.length >= 2
      ? this.patientsListFiltered = this.filterService.searchBy(this.patientsList, filterValue.value, 'firstName')
      : this.patientsListFiltered = this.patientsList
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
    this.allergyService.add(this.allergyTO.patientId, this.allergyTO).subscribe((): void => {
        console.log('New allergies added!')
        this.onNoClick(true)
      },
        (err: Error): void => {
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
    // this.allergyService.edit(this.allergies.id, this.allergies).subscribe((): void => {
    //     console.log('Medication updated!')
    //     this.onNoClick(true)
    //   },
    //   (err: Error): void => {
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
      (value: IPerson): void => {
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
    }
    return null
  }

}
