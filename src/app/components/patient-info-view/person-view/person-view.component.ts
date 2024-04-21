import { Component, Input, OnInit } from '@angular/core'
import { IPerson, ISecurity } from '../../../model/person.interface'
import { IAddress } from '../../../model/address.interface'
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
    selector: 'app-person-view',
    templateUrl: './person-view.component.html',
    styleUrls: ['./person-view.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule, NgIf, MatButtonModule, MatTooltipModule, MatIconModule]
})
export class PersonViewComponent implements OnInit {
  editMode: boolean = false
  @Input() person: IPerson = <IPerson>{address: <IAddress>{}, security: <ISecurity>{}}

  constructor() {
  }

  ngOnInit(): void {
  }

  onFormSubmit(): void {
  }

}
