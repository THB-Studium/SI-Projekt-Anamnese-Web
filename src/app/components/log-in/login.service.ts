import { Injectable } from '@angular/core'
import { map } from 'rxjs/operators'
import { SessionService } from '../../core/authentification-and-authority/session.service'
import { Router } from '@angular/router'
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { AppConfigService } from '../../core/app-config.service'
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs'



@Injectable({providedIn: 'root'})
export class LoginService {

    private tokenRequest: Observable<any>
    private readonly authUrl: string
    // private readonly resetPwdUrl: string

    constructor(
        private httpClient: HttpClient,
        private router: Router,
        private appConfig: AppConfigService,
        private sessionService: SessionService,
    ) {
        this.authUrl = appConfig.getAuthenticationPath
        // this.resetPwdUrl = this.appConfig.getAuthUrl + '/password_reset'
    }

    /*** to log in ***/
    login(username: string, password: string): any {
        let headers: HttpHeaders = new HttpHeaders()
        headers = headers.append('Authorization', 'Basic ' + btoa(username + ':' + password))
        return this.tokenRequest = this.httpClient.post(this.authUrl, null, {headers: headers})
            .pipe(map((res: HttpResponse<any>) => res))
    }

    /*** to log out ***/
    logout(): void {
        let headers: HttpHeaders = new HttpHeaders()
        headers = headers.append('Authorization', 'Bearer ' + this.sessionService.getToken())
        this.tokenRequest = this.httpClient.delete(
            this.authUrl + '/' + this.sessionService.getToken(), {headers: headers})


        // to clean all and go to the login page:
        this.tokenRequest.subscribe((data: any) => {
                this.sessionService.clearSession()
                console.log('logout successfully')
                console.log('token: ' + this.sessionService.getToken()) // to check if leer
                this.router.navigate(['/login'])
            }
        )
    }

    // createPasswordReset(username: string): Observable<any> {
    //     const headers = new HttpHeaders().append('Content-Type', 'application/json')
    //     return this.httpClient.post<any>(
    //         this.resetPwdUrl, '{"username": "' + username + '"}', { headers: headers })
    // }
    //
    // setNewPassword(id: string, password: string): Observable<any> {
    //     const headers = new HttpHeaders().append('Content-Type', 'application/json')
    //     return this.httpClient.put<any>(
    //         this.resetPwdUrl + '/' + id, '{"password": "' + password + '"}', { headers: headers })
    // }

}

