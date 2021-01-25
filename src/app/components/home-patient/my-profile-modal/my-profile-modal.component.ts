import { Component, Inject, OnInit } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { IPerson } from '../../../model/person.interface'

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
  ) { }

  ngOnInit(): void {
    this.person = this.receivedData.person
    this.receivedData.personType === 'personal'
      ? this.modalTitle = 'Pernalsprofil' : this.modalTitle = 'Mein Profil'
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

  onFormSubmit(): void {
    console.log(this.receivedData)
    this.editMode = false
  }

}
