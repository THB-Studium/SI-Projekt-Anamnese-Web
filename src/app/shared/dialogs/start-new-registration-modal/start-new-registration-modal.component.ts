import { IPerson, IPersonTO } from '../../../model/person.interface'
import { Component, Inject, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { PersonService } from '../../../components/services/person.service'
import { MyProfileModalComponent } from '../../../components/home-patient/my-profile-modal/my-profile-modal.component'
import { rootingPath } from '../../rooting-path'
import { geheimfragen, genderConstants, maritalStatusValues } from '../../constante'

@Component({
  selector: 'app-start-new-registration-modal',
  templateUrl: './start-new-registration-modal.component.html',
  styleUrls: ['./start-new-registration-modal.component.css']
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

  userCreted: boolean
  berich: string = ''

  readonly login_path: string

  private personsList: Array<IPerson> = []

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private personService: PersonService,
    public dialogRef: MatDialogRef<MyProfileModalComponent>,
    @Inject(MAT_DIALOG_DATA) public receivedData: any
  ) {
    this.login_path = rootingPath.login
  }

  ngOnInit(): void {
    this.receivedData.personType === 'patient'
      ? this.modalTitle  = 'Neue Patientenregistrierung'
      : this.modalTitle  = 'Neue Personalregistrierung'

    this.initperson()
    this.formGroupInit()
    this.listPersons()
  }

  onNoClick(answerValue: boolean): void {
    this.dialogRef.close({answer: answerValue})
  }

  onHasChildren(event: any): void {
    this.person.children = event === 'true' ? true : false
  }

  checkForUnicness(): void {
    const personFound = this.personsList.filter((person: IPerson) => person.userName === this.person.userName)
    if (personFound.length > 0) {
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
      groeßeCtrl: '',
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
      (firstName: string) => {
        this.person.firstName = firstName
        const editedFirstName = firstName.split(' ')[0].toLowerCase()
        this.person.userName = editedFirstName
        console.log(this.person.userName)
      })

    this.personenbezogeneFormGroup.controls['nachnameCtrl'].valueChanges.subscribe(
      (lastName: string) => {
        this.person.lastName = lastName
        const editedFirstName = this.person.firstName.split(' ')[0].toLowerCase()
        const editedLastName = lastName.split(' ')[0]
        this.person.userName = editedFirstName + this.firstLatterToUpperCase(editedLastName)
        console.log(this.person.userName)
      })

    this.personenbezogeneFormGroup.controls['berufCtrl'].valueChanges.subscribe(
      (beruf: string) => {
        this.person.profession = beruf
      })

    this.personenbezogeneFormGroup.controls['groeßeCtrl'].valueChanges.subscribe(
      (groeße: string) => {
        this.person.height = +groeße
      })

    this.personenbezogeneFormGroup.controls['gewichtCtrl'].valueChanges.subscribe(
      (gewicht: string) => {
        this.person.weight = +gewicht
      })

    this.personenbezogeneFormGroup.controls['familienstandCtrl'].valueChanges.subscribe(
      (maritalStatus: string) => {
        this.person.maritalStatus = maritalStatus
      })


    // Kontaktdaten:
    this.kontaktdatenFormGroup.controls['handyNumberCtrl'].valueChanges.subscribe(
      (handynumber: string) => {
        this.person.phoneNumber = '+49' + handynumber
      })

    this.kontaktdatenFormGroup.controls['emailCtrl'].valueChanges.subscribe(
      (email: string) => {
        this.person.email = email
      })


    // Anschrift Infos:
    this.anschriftFormGroup.controls['strasseCtrl'].valueChanges.subscribe(
      (strasse: string) => {
        this.person.streetAndNumber = strasse
      })

    this.anschriftFormGroup.controls['plzCtrl'].valueChanges.subscribe(
      (plz: string) => {
        this.person.postalCode = plz
      })

    this.anschriftFormGroup.controls['landCtrl'].valueChanges.subscribe(
      (land: string) => {
        this.person.country = land
      })

    this.anschriftFormGroup.controls['stadtCtrl'].valueChanges.subscribe(
      (stadt: string) => {
        this.person.city = stadt
      })


    // zugangdaten:
    let password: string = ''

    this.zugangdatenFormGroup.controls['passwort1Ctrl'].valueChanges.subscribe(
      (passwort1: string) => {
        password = passwort1
      })

    this.zugangdatenFormGroup.controls['passwort2Ctrl'].valueChanges.subscribe(
      (passwort2: string) => {
        password === passwort2
          ? this.person.password = passwort2
          : this.snackBar.open(
          'Die Passwörter stimmen nicht überein!', 'Close',
          {duration: 5000}
          )
      })

    this.zugangdatenFormGroup.controls['geheimfrageCtrl'].valueChanges.subscribe(
      (geheimfrage: string) => {
        this.person.secretQuestion = geheimfrage
      })

    this.zugangdatenFormGroup.controls['antwortCtrl'].valueChanges.subscribe(
      (antwort: string) => {
        this.person.answer = antwort
      })

  }

  private firstLatterToUpperCase(text: string): string {
    return text.toLowerCase().replace(/^[a-zA-z]|\s(.)/ig, L => L.toUpperCase())
  }

  private initperson(): void {
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
    this.personService.getAll().subscribe((data: any) => {
        this.personsList = data
      },
      err => {
        console.log('Error in NewRegistrationModalComponent.listPersons()')
        console.log(err)
        this.snackBar.open('Could not fetch persons', 'Close', {
          duration: 4000
        })
      }
    )
  }

  private createPerson(): void {
    this.personService.add(this.person).subscribe(() => {
        this.userCreted = true
        this.berich = 'Registrierung abgeschlossen: Benutzer erfolgreich registriert!'
      },
      err => {
        this.userCreted = false
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
