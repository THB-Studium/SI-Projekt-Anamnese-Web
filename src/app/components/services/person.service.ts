import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { v4 as uuid } from 'uuid'
import { AppConfigService } from '../../core/app-config.service'
import { IPerson, IPersonTO } from '../../model/person.interface'


@Injectable({providedIn: 'root'})
export class PersonService {
  private readonly personUrl: string
  private readonly personItemUrl: string

  constructor(
    private httpClient: HttpClient,
    private appConfig: AppConfigService,
  ) {
    this.personUrl = this.appConfig.getPersonPath
    this.personItemUrl = this.appConfig.getPersonPath + '/'
  }


// EXTRA METHODES:....................................................................

  /*** TO GET ALL PERSON: ***/
  getAll(queryParam?: HttpParams): any {
    return this.httpClient.get<Array<IPerson>>(this.personUrl, {params: queryParam})
      .pipe(map((res: Array<IPerson>) => res))
  }

  /*** TO GET ONE BY PERSON ID: ***/
  getOne(personId: uuid): any {
    return this.httpClient.get<IPerson>(this.personItemUrl + personId)
      .pipe(map((res: IPerson) => res))
  }

  /*** TO ADD A NEW PERSON ***/
  add(person: IPersonTO): any {
    return this.httpClient.post(this.personUrl, person)
      .pipe(map((res: IPerson) => res))
  }

  /***  TO EDIT A PERSON ***/
  edit(personId: uuid, person: IPerson): any {
    return this.httpClient.put(this.personItemUrl + personId, person)
  }

  /*** TO DELETE A PERSON ***/
  delete(personId: uuid): any {
    return this.httpClient.delete(this.personItemUrl + personId)
  }

}
