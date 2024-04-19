import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { v4 as uuid } from 'uuid'
import { AppConfigService } from '../core/app-config.service'
import { IDiagnosis, IDiagnosisTO } from '../model/diagnosis.interface'


@Injectable({providedIn: 'root'})
export class DiagnosisService {
  private readonly diagnosisUrl: string
  private readonly diagnosisItemUrl: string
  private readonly personItemUrl: string

  constructor(
    private httpClient: HttpClient,
    private appConfig: AppConfigService,
  ) {
    this.diagnosisUrl = this.appConfig.getDiagnosisPath
    this.diagnosisItemUrl = this.appConfig.getDiagnosisPath + '/'
    this.personItemUrl = this.appConfig.getPersonPath + '/'
  }


// EXTRA METHODES:....................................................................

  /*** TO GET ALL DIAGNOSIS: ***/
  getAll(queryParam?: HttpParams): any {
    return this.httpClient.get<Response>(this.diagnosisUrl, {params: queryParam})
      .pipe(map((res: Response) => res))
  }
  /*** TO GET ALL DIAGNOSIS: ***/
  getAllByPersonId(personId: uuid, queryParam?: HttpParams): any {
    return this.httpClient.get<Response>(
      this.personItemUrl + personId + '/diagnosis', {params: queryParam})
      .pipe(map((res: Response) => res))
  }

  /*** TO GET ONE BY DIAGNOSIS ID: ***/
  getOne(diagnosisId: uuid): any {
    return this.httpClient.get(this.diagnosisItemUrl + diagnosisId)
      .pipe(map((res: any) => res))
  }

  /*** TO ADD A NEW DIAGNOSIS ***/
  add(diagnosis: IDiagnosisTO): any {
    return this.httpClient.post(this.diagnosisUrl, diagnosis)
      .pipe(map((res: Response) => res))
  }

  /***  TO EDIT A DIAGNOSIS ***/
  edit(diagnosisId: uuid, update: IDiagnosis): any {
    return this.httpClient.put(this.diagnosisItemUrl + diagnosisId, update)
  }

  /*** TO DELETE A DIAGNOSIS ***/
  delete(diagnosisId: uuid): any {
    return this.httpClient.delete(this.diagnosisItemUrl + diagnosisId)
  }

}
