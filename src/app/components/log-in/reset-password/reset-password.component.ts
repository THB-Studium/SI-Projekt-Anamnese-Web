import { Component, OnInit } from '@angular/core'
import { rootingPath } from '../../../shared/rooting-path'

// @ts-ignore
import personsJson from '../../../shared/data/person-list.json'
import { IPerson } from '../../../model/person.interface'
import { environment } from '../../../../environments/environment'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
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
    this.login_path = rootingPath.login
    this.currentEnvironment = environment.currentEnvironment
  }

  ngOnInit(): void {
  }

  onUserName(event: any): void {
    if (event.length > 2) {
      this.person = personsJson.filter((item: IPerson) => item.userName === event)[0]

      if (this.person && this.person.id !== null) {
        this.secretQuestion = this.person.security.secretQuestion
      } else {
        this.snackBar.open(
          'No user found with this userName "' + event + '"', 'Close',
          {duration: 4000}
        )
      }
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
