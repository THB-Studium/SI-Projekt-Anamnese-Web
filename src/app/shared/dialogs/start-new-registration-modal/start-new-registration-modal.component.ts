import { IPerson, IPersonTO } from '../../../model/person.interface'
import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'
import { PersonService } from '../../../services/person.service'
import { MyProfileModalComponent } from '../../../components/home-patient/my-profile-modal/my-profile-modal.component'
import { rootingPaths } from '../../const/rooting-paths'
import { geheimfragen, genderConstants, maritalStatusValues } from '../../const/constante'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatOptionModule } from '@angular/material/core';
import { NgFor, NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDividerModule } from '@angular/material/divider';

@Component({
    selector: 'app-start-new-registration-modal',
    templateUrl: './start-new-registration-modal.component.html',
    styleUrls: ['./start-new-registration-modal.component.css'],
    standalone: true,
    imports: [MatDividerModule, MatStepperModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, NgFor, MatOptionModule, MatButtonToggleModule, MatInputModule, MatAutocompleteModule, MatButtonModule, MatIconModule, NgIf]
})
export class StartNewRegistrationModalComponent implements OnInit {
  modalTitle: string
  personenbezogeneFormGroup: FormGroup
  kontaktdatenFormGroup: FormGroup
  anschriftFormGroup: FormGroup
  zugangdatenFormGroup: FormGroup

  familienstandList: Array<string> = maritalStatusValues.all

  readonly gender: Array<string> = [genderConstants.man, genderConstants.woman]
  readonly geheimfragen: Array<string> = geheimfragen.values

  person: IPersonTO = <IPersonTO>{}

  hidePassword1: boolean = true
  hidePassword2: boolean = true

  userCreated: boolean
  berich: string = ''

  readonly login_path: string

  private personsList: Array<IPerson> = []

  constructor(
    private _formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private personService: PersonService,
    public dialogRef: MatDialogRef<MyProfileModalComponent>,
    @Inject(MAT_DIALOG_DATA) public receivedData: any
  ) {
    this.login_path = rootingPaths.login
  }

  ngOnInit(): void {
    this.receivedData.personType === 'patient'
      ? this.modalTitle = 'Neue Patientenregistrierung'
      : this.modalTitle = 'Neue Personalregistrierung'

    this.initPerson()
    this.formGroupInit()
    this.listPersons()
  }

  onNoClick(answerValue: boolean): void {
    this.dialogRef.close({answer: answerValue})
  }

  onHasChildren(event: string): void {
    this.person.children = event === 'true'
  }

  checkForUniqueness(): void {
    const personExist: boolean = this.personsList
      .filter((person: IPerson): boolean => person.userName === this.person.userName)
      .length > 0

    if (personExist) {
      this.person.userName += '_' + Math.floor(Math.random() * 3).toString()
      this.zugangdatenFormGroup.controls['benutzernameCtrl'].setValue([this.person.userName])
    }
  }

  confirmPwdRegistration(): void {
    this.person.gender = this.personenbezogeneFormGroup.controls.geschlechtCtrl.value
    this.receivedData && this.receivedData.personType
      ? this.person.type = this.receivedData.personType : this.person.type = 'patient'

    if (this.person.type === 'patient') {
      this.person.recorded = true
    }

    this.createPerson()
  }

  private formGroupInit(): void {

    // INIT:............................................................

    // Personenbezogene Daten:
    this.personenbezogeneFormGroup = this._formBuilder.group({
      geschlechtCtrl: [genderConstants.man, Validators.required],
      vornameCtrl: ['', Validators.required],
      nachnameCtrl: ['', Validators.required],
      berufCtrl: '',
      groesseCtrl: '',
      gewichtCtrl: '',
      familienstandCtrl: '',
    })

    // Kontaktdaten:
    this.kontaktdatenFormGroup = this._formBuilder.group({
      handyNumberCtrl: '',
      emailCtrl: ''
    })

    // Anschrift Infos:
    this.anschriftFormGroup = this._formBuilder.group({
      strasseCtrl: ['', Validators.required],
      plzCtrl: ['', Validators.required],
      landCtrl: ['', Validators.required],
      stadtCtrl: ['', Validators.required],
    })

    // zugangdaten:
    this.zugangdatenFormGroup = this._formBuilder.group({
      benutzernameCtrl: [{value: '', disabled: true}, Validators.required],
      passwort1Ctrl: ['', Validators.required],
      passwort2Ctrl: ['', Validators.required],
      geheimfrageCtrl: ['', Validators.required],
      antwortCtrl: ['', Validators.required],
    })


    // ON DATA CHANGE:.....................................................

    // Personenbezogene Daten:
    this.personenbezogeneFormGroup.controls['vornameCtrl'].valueChanges.subscribe(
      (firstName: string): void => {
        this.person.firstName = firstName
        const editedFirstName = firstName.split(' ')[0].toLowerCase()
        this.person.userName = editedFirstName
        console.log(this.person.userName)
      })

    this.personenbezogeneFormGroup.controls['nachnameCtrl'].valueChanges.subscribe(
      (lastName: string): void => {
        this.person.lastName = lastName
        const editedFirstName: string = this.person.firstName.split(' ')[0].toLowerCase()
        const editedLastName: string = lastName.split(' ')[0]
        this.person.userName = editedFirstName + this.firstLetterToUpperCase(editedLastName)
        console.log(this.person.userName)
      })

    this.personenbezogeneFormGroup.controls['berufCtrl'].valueChanges.subscribe(
      (beruf: string): void => {
        this.person.profession = beruf
      })

    this.personenbezogeneFormGroup.controls['groesseCtrl'].valueChanges.subscribe(
      (groeße: string): void => {
        this.person.height = +groeße
      })

    this.personenbezogeneFormGroup.controls['gewichtCtrl'].valueChanges.subscribe(
      (gewicht: string): void => {
        this.person.weight = +gewicht
      })

    this.personenbezogeneFormGroup.controls['familienstandCtrl'].valueChanges.subscribe(
      (maritalStatus: string): void => {
        this.person.maritalStatus = maritalStatus
      })


    // Kontaktdaten:
    this.kontaktdatenFormGroup.controls['handyNumberCtrl'].valueChanges.subscribe(
      (handynumber: string): void => {
        this.person.phoneNumber = '+49' + handynumber
      })

    this.kontaktdatenFormGroup.controls['emailCtrl'].valueChanges.subscribe(
      (email: string): void => {
        this.person.email = email
      })


    // Anschrift Infos:
    this.anschriftFormGroup.controls['strasseCtrl'].valueChanges.subscribe(
      (strasse: string): void => {
        this.person.streetAndNumber = strasse
      })

    this.anschriftFormGroup.controls['plzCtrl'].valueChanges.subscribe(
      (plz: string): void => {
        this.person.postalCode = plz
      })

    this.anschriftFormGroup.controls['landCtrl'].valueChanges.subscribe(
      (land: string): void => {
        this.person.country = land
      })

    this.anschriftFormGroup.controls['stadtCtrl'].valueChanges.subscribe(
      (stadt: string): void => {
        this.person.city = stadt
      })


    // zugangdaten:
    let password: string = ''

    this.zugangdatenFormGroup.controls['passwort1Ctrl'].valueChanges.subscribe(
      (passwort1: string): void => {
        password = passwort1
      })

    this.zugangdatenFormGroup.controls['passwort2Ctrl'].valueChanges.subscribe(
      (passwort2: string): void => {
        password === passwort2
          ? this.person.password = passwort2
          : this.snackBar.open(
            'Die Passwörter stimmen nicht überein!', 'Close',
            {duration: 5000}
          )
      })

    this.zugangdatenFormGroup.controls['geheimfrageCtrl'].valueChanges.subscribe(
      (geheimfrage: string): void => {
        this.person.secretQuestion = geheimfrage
      })

    this.zugangdatenFormGroup.controls['antwortCtrl'].valueChanges.subscribe(
      (antwort: string): void => {
        this.person.answer = antwort
      })

  }

  private firstLetterToUpperCase(text: string): string {
    return text.toLowerCase()
      .replace(/^[a-zA-z]|\s(.)/ig, (letter: string) => letter.toUpperCase())
  }

  private initPerson(): void {
    this.person = <IPersonTO>{
      userName: null,
      password: null,

      // Security:
      secretQuestion: null,
      answer: null,

      firstName: null,
      lastName: null,
      profession: null,

      // Address:
      city: null,
      country: null,
      postalCode: null,
      streetAndNumber: null,

      allergyNames: [],

      phoneNumber: null,
      email: null,
      maritalStatus: null,
      children: true,

      gender: null,
      height: null,
      weight: null,

      type: 'patient',
      recorded: false
    }
  }

  private listPersons(): void {
    this.personService.getAll().subscribe((data: any): void => {
        this.personsList = data
      },
      (err: Error): void => {
        console.log('Error in NewRegistrationModalComponent.listPersons()')
        console.log(err)
        this.snackBar.open('Could not fetch persons', 'Close', {
          duration: 4000
        })
      }
    )
  }

  private createPerson(): void {
    this.personService.add(this.person).subscribe((): void => {
        this.userCreated = true
        this.berich = 'Registrierung abgeschlossen: Benutzer erfolgreich registriert!'
      },
      (err: Error): void => {
        this.userCreated = false
        this.berich = 'Error: Benutzer nicht erfolgreich registriert!'

        console.log('Error in NewRegistrationModalComponent.listPersons()')
        console.log(err)
        this.snackBar.open('Could not fetch persons', 'Close', {
          duration: 4000
        })
      }
    )
  }

}
