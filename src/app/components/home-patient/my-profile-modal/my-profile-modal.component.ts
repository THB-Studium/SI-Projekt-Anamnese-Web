import { Component, Inject, OnInit } from '@angular/core'
import { IPerson } from '../../../model/person.interface'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
    selector: 'app-my-profile-modal',
    templateUrl: './my-profile-modal.component.html',
    styleUrls: ['./my-profile-modal.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule, MatDividerModule, NgIf, MatButtonModule, MatTooltipModule, MatIconModule]
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
