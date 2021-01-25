import { Injectable } from '@angular/core'


@Injectable({providedIn: 'root'})
export class SessionService {
  private authTokenKey: string = 'authToken'
  private usernameKey: string = 'username'
  private userIdKey: string = 'userId'
  private personTypeKey: string = 'personType'

  /*** is authenticated ***/
  isAuthenticated(): boolean {
    return !!this.getToken()
  }

  /*** to set the session ***/
  setSession(session: any, username: string): void {
    this.setToken(session.access_token)
    this.setUserId(session.id)
    this.setUsername(username)
  }

  /*** to clear the session ***/
  clearSession(): void {
    sessionStorage.clear()
    console.log('cession clear')
  }

  /*** about the authenticated token ***/
  setToken(token: any): void {
    sessionStorage.setItem(this.authTokenKey, token)
  }

  getToken(): any {
    const token = sessionStorage.getItem(this.authTokenKey)
    if (token) {
      return token
    } else {
      return ''
    }
  }

  /*** about the userName ***/
  setUsername(username: string): void {
    sessionStorage.setItem(this.usernameKey, username)
  }

  getUsername(): any {
    return sessionStorage.getItem(this.usernameKey)
  }

  /*** about the userId ***/
  setUserId(userId: string): void {
    sessionStorage.setItem(this.userIdKey, userId)
  }

  getUserId(): any {
    return sessionStorage.getItem(this.userIdKey)
  }

  /*** about the personType ***/
  setPersonTypeKey(personTypeKey: string): void {
    sessionStorage.setItem(this.personTypeKey, personTypeKey)
  }

  getPersonTypeKey(): any {
    return sessionStorage.getItem(this.personTypeKey)
  }

}
