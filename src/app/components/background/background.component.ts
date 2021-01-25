import { Component, OnInit } from '@angular/core'
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements OnInit {
  readonly currentEnvironment: string

  constructor() { this.currentEnvironment = environment.currentEnvironment }

  ngOnInit(): void { }

}
