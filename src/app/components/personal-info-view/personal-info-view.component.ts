import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { MatLegacyTabChangeEvent as MatTabChangeEvent } from '@angular/material/legacy-tabs'
import { rootingPath } from '../../shared/rooting-path'
import { IPerson } from '../../model/person.interface'
import { PersonService } from '../services/person.service'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-personal-info-view',
  templateUrl: './personal-info-view.component.html',
  styleUrls: ['./personal-info-view.component.css']
})
export class PersonalInfoViewComponent implements OnInit {
  readonly headerTitle: string = 'Personal information view'
  readonly personal: string = 'personal'
  readonly patienten: string = 'patienten'
  readonly diagnose: string = 'diagnose'
  readonly krankheiten: string = 'krankheiten'
  readonly allergien: string = 'allergien'
  readonly medikamenten: string = 'medikamenten'
  readonly personType: Array<string> = ['personal', 'patient']

  patientsList: Array<IPerson> = []
  tabIndex: number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private personService: PersonService,
    private snackBar: MatSnackBar,
  ) {
    this.activeTab()
  }

  ngOnInit(): void {
    this.listPatients()
  }

  activeTab(): void {
    const fragment: string = this.route.snapshot.params.fragment
    switch (fragment) {
      case this.personal:
        this.tabIndex = 0
        break
      case this.patienten:
        this.tabIndex = 1
        break
      case this.diagnose:
        this.tabIndex = 2
        break
      case this.krankheiten:
        this.tabIndex = 3
        break
      case this.allergien:
        this.tabIndex = 4
        break
      case this.medikamenten:
        this.tabIndex = 5
        break
    }
  }

  onTabClicked(event: MatTabChangeEvent): void {
    this.tabIndex = event.index
    switch (event.index) {
      case 0:
        this.navTo(this.personal)
        break
      case 1:
        this.navTo(this.patienten)
        break
      case 2:
        this.navTo(this.diagnose)
        break
      case 3:
        this.navTo(this.krankheiten)
        break
      case 4:
        this.navTo(this.allergien)
        break
      case 5:
        this.navTo(this.medikamenten)
        break
    }
  }

  private navTo(fragment: string): void {
    this.router.navigate([rootingPath.personal_info_view, {fragment: fragment}]).then()
  }

  private listPatients(): void {
    this.personService.getAll().subscribe((data: Array<IPerson>) => {
        this.patientsList = data.filter(person => person.type === 'patient')
      },
        (err: Error) => {
        console.log('Error in MedicationInTakeModalComponent.listPatients()')
        console.log(err)
        this.snackBar.open('Could not fetch patients', 'Close', {
          duration: 4000
        })
      }
    )
  }

}
