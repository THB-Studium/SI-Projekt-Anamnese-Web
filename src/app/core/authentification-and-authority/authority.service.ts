import { Injectable } from '@angular/core'
import { SessionService } from './session.service'
import { map } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'
import { AppConfigService } from '../app-config.service'


@Injectable({providedIn: 'root'})
export class AuthorityService {
    permissions: any = {}
    private authUrl: string

    constructor(
        private httpClient: HttpClient,
        private auth: SessionService,
        private appConfig: AppConfigService,
    ) {
        this.authUrl = this.appConfig.getAuthorityPath
        this.loadAuthorities()
    }

    /*** to check all authorities ***/
    loadAuthorities(): void {
        this.clearPermissions()
        this.getAuthorities()
    }

    /*** to set the "admin" authority: ***/
    private getAuthorities(): any {
        if (this.auth.isAuthenticated()) {
            return this.httpClient.get(this.authUrl)
                .pipe(map(res => res))
                .subscribe((authorities: any) => {
                    for (const r of authorities) {
                        this.permissions[r.name] = true
                    }
                }, (error: any) => {
                    console.log('Error in AuthorityService.getAuthorities()')
                    console.log(error)
                })
        }

    }

    /*** to clean all: ***/
    private clearPermissions(): void {
        this.permissions   = {}
    }

}
