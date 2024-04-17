import { Component, Input, OnInit } from '@angular/core'
import { IPerson, ISecurity } from '../../../model/person.interface'
import { IAddress } from '../../../model/address.interface'

@Component({
  selector: 'app-person-view',
  templateUrl: './person-view.component.html',
  styleUrls: ['./person-view.component.css']
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
