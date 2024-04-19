import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { MatLegacyTabChangeEvent as MatTabChangeEvent } from '@angular/material/legacy-tabs'
import { rootingPaths } from '../../shared/const/rooting-paths'
import { IPerson } from '../../model/person.interface'
import { PersonService } from '../../services/person.service'
import { SessionService } from '../../core/authentification-and-authority/session.service'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-patient-info-view',
  templateUrl: './patient-info-view.component.html',
  styleUrls: ['./patient-info-view.component.css']
})
export class PatientInfoViewComponent implements OnInit {
  headerTitle: string = 'Patient information view'
  currentUser: IPerson = <IPerson>{}
  tabIndex: number

  readonly allergien: string = 'allergien'
  readonly diagnose: string = 'diagnose'
  readonly krankheiten: string = 'krankheiten'
  readonly medikamenten: string = 'medikamenten'


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private personService: PersonService,
    private sessionService: SessionService,
    private snackBar: MatSnackBar
  ) {
    this.activeTab()
    this.getCurrentUser()
  }

  ngOnInit(): void {
  }

  activeTab(): void {
    const fragment: string = this.route.snapshot.params.fragment
    switch (fragment) {
      case this.diagnose:
        this.tabIndex = 0
        break
      case this.krankheiten:
        this.tabIndex = 1
        break
      case this.allergien:
        this.tabIndex = 2
        break
      case this.medikamenten:
        this.tabIndex = 3
        break
    }
  }

  onTabClicked(event: MatTabChangeEvent): void {
    this.tabIndex = event.index
    switch (event.index) {
      case 0:
        this.navTo(this.diagnose)
        break
      case 1:
        this.navTo(this.krankheiten)
        break
      case 2:
        this.navTo(this.allergien)
        break
      case 3:
        this.navTo(this.medikamenten)
        break
    }
  }

  private navTo(fragment: string): void {
    this.router.navigate([rootingPaths.patient_info_view, {fragment: fragment}]).then()
  }

  private getCurrentUser(): void {
    this.personService.getOne(this.sessionService.getUserId()).subscribe(
      (person: IPerson): void => {
        this.currentUser = person
        console.log(this.currentUser)
      }
      ,
      (err: Error): void => {
        console.log('Error in PatientInfoViewComponent.getCurrentUser()')
        console.log(err)
        this.snackBar.open('Could not fetch this current user data', 'Close', {
          duration: 4000
        })
      }
    )
  }
}
