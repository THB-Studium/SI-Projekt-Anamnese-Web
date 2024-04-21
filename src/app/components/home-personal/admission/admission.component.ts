import { Component, OnInit } from '@angular/core'
import { HeaderComponent } from '../../../shared/components/header/header.component';

@Component({
    selector: 'app-admission',
    templateUrl: './admission.component.html',
    styleUrls: ['./admission.component.css'],
    standalone: true,
    imports: [HeaderComponent]
})
export class AdmissionComponent implements OnInit {
  headerTitle: string = 'Aufname'

  constructor() {
  }

  ngOnInit(): void {
  }

}
