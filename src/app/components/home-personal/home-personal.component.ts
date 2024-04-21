import { Component, OnInit } from '@angular/core'
import { rootingPaths } from '../../shared/const/rooting-paths'
import { Router } from '@angular/router'
import { environment } from '../../../environments/environment'
import { NgOptimizedImage } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
    selector: 'app-home-personal',
    templateUrl: './home-personal.component.html',
    styleUrls: ['./home-personal.component.css'],
    standalone: true,
    imports: [HeaderComponent, NgOptimizedImage]
})
export class HomePersonalComponent implements OnInit {
  readonly headerTitle: string = 'Administration - Home'
  readonly personal_info_view_path: string
  readonly currentEnvironment: string

  constructor(
    private router: Router
  ) {
    this.headerTitle = 'Administration - Home'
    this.personal_info_view_path = '/' + rootingPaths.personal_info_view
    this.currentEnvironment = environment.currentEnvironment
  }

  ngOnInit(): void {
  }

  navTo(tabName: string): void {
    this.router.navigate([this.personal_info_view_path, {fragment: tabName}]).then()
  }

}
