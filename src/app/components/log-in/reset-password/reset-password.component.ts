import { Component, OnInit } from '@angular/core'
import { rootingPaths } from '../../../shared/const/rooting-paths'

// @ts-ignore
import personsJson from '../../../shared/data/person-list.json'
import { IPerson } from '../../../model/person.interface'
import { environment } from '../../../../environments/environment'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { BackgroundComponent } from '../../background/background.component'

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css'],
    standalone: true,
    imports: [
      BackgroundComponent, MatCardModule, ReactiveFormsModule, FormsModule, MatFormFieldModule,
      MatInputModule, MatIconModule, MatButtonModule
    ]
})
export class ResetPasswordComponent implements OnInit {
  hidePassword: boolean = true
  isClicked: boolean
  error: string
  person: IPerson = <IPerson>{}
  username: string
  secretQuestion: string
  answer: string
  answerCorrect: boolean
  newPassword: string

  readonly login_path: string
  readonly currentEnvironment: string

  constructor(
    private snackBar: MatSnackBar
  ) {
    this.login_path = rootingPaths.login
    this.currentEnvironment = environment.currentEnvironment
  }

  ngOnInit(): void {
  }

  onUserName(event: any): void {
    if (event.length > 2) {
      this.person = personsJson.filter((item: IPerson): boolean => item.userName === event)[0]

      this.person?.id !== null
        ? this.secretQuestion = this.person.security.secretQuestion
        : this.snackBar.open(
          'No user found with this userName "' + event + '"', 'Close',
          {duration: 4000}
        )
    }
  }

  onAnswer(event: any): void {
    if (event.length > 2) {
      let personAnswer: string = ''
      if (this.person) {
        personAnswer = this.person.security.answer.toLowerCase().split('str')[0]
      }

      event.toLowerCase().split('str')[0] === personAnswer
        ? this.answerCorrect = true : this.answerCorrect = false
    }
  }

  confirmPwdReset(): void {
    // personsJson.filter((item: IPerson) => item.id === this.person.id)['passWord'] = this.newPassword

    // const jsonfile = require('jsonfile')
    // const fs = require('browserify-fs')
    // const path: string = '../../../shared/data/person-list2.json'
    //
    // const persons: Array<IPerson> = personsJson
    // persons.forEach((person: IPerson) => {
    //   if (person.id = this.person.id) {
    //     person.passWord = this.newPassword
    //   }
    // })
    //
    // const data = JSON.stringify(persons)
    // // jsonfile.writeFileSync('../../../shared/data/person-list.json', data)
    // // fs.writeFile('../../../shared/data/person-list2.json', data)
    //
    // fs.writeFile(path, data, (err) => {
    //   if (err) { throw err }
    //   console.log('The file has been saved!')
    // })
    //
    //
    // console.log('done!')
  }

}
