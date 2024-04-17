import { Component, Inject, OnInit } from '@angular/core'
import { IPerson } from '../../../model/person.interface'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-my-profile-modal',
  templateUrl: './my-profile-modal.component.html',
  styleUrls: ['./my-profile-modal.component.css']
})
export class MyProfileModalComponent implements OnInit {
  editMode: boolean = false
  person: IPerson = <IPerson>{}
  modalTitle: string = ''

  constructor(
    public dialogRef: MatDialogRef<MyProfileModalComponent>,
    @Inject(MAT_DIALOG_DATA) public receivedData: any
  ) {
  }

  ngOnInit(): void {
    this.person = this.receivedData.person
    this.receivedData.personType === 'personal'
      ? this.modalTitle = 'Personalsprofil' : this.modalTitle = 'Mein Profil'
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

  onFormSubmit(): void {
    console.log(this.receivedData)
    this.editMode = false
  }

}
