import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { v4 as uuid } from 'uuid'
import { AppConfigService } from '../../core/app-config.service'
import { IIllness } from '../../model/illness.interface'


@Injectable({providedIn: 'root'})
export class IllnessService {
  private readonly illnessUrl: string
  private readonly illnessItemUrl: string
  private readonly personItemUrl: string

  constructor(
    private httpClient: HttpClient,
    private appConfig: AppConfigService,
  ) {
    this.illnessUrl = this.appConfig.getIllnessesPath
    this.illnessItemUrl = this.appConfig.getIllnessesPath + '/'
    this.personItemUrl = this.appConfig.getPersonPath + '/'
  }


// EXTRA METHODES:....................................................................

  /*** TO GET ALL ILLNESS: ***/
  getAll(queryParam?: HttpParams): any {
    return this.httpClient.get<Response>(this.illnessUrl, {params: queryParam})
      .pipe(map((res: Response) => res))
  }

  /*** TO GET ALL ILLNESS: ***/
  // getAllByPersonId(patientId: uuid, queryParam?: HttpParams): any {
  //   return this.httpClient.get<Response>(
  //     this.personItemUrl + patientId + '/illness', {params: queryParam})
  //     .pipe(map((res: Response) => res))
  // }

  /*** TO GET ONE BY ILLNESS ID: ***/
  getOne(illnessId: uuid): any {
    return this.httpClient.get(this.illnessItemUrl + illnessId)
      .pipe(map((res: any) => res))
  }

  /*** TO ADD A NEW ILLNESS ***/
  add(illness: IIllness): any {
    return this.httpClient.post(this.illnessUrl, illness)
      .pipe(map((res: Response) => res))
  }

  /***  TO EDIT A ILLNESS ***/
  edit(illnessId: uuid, update: IIllness): any {
    return this.httpClient.put(this.illnessItemUrl + illnessId, update)
  }

  /*** TO DELETE A ILLNESS ***/
  delete(illnessId: uuid): any {
    return this.httpClient.delete(this.illnessItemUrl + illnessId)
  }

}
