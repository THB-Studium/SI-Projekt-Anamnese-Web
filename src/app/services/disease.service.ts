import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { v4 as uuid } from 'uuid'
import { AppConfigService } from '../core/app-config.service'
import { IDisease, IDiseaseTO } from '../model/disease.interface'


@Injectable({providedIn: 'root'})
export class DiseaseService {
  private readonly diseasesUrl: string
  private readonly diseaseItemUrl: string
  private readonly personItemUrl: string

  constructor(
    private httpClient: HttpClient,
    private appConfig: AppConfigService,
  ) {
    this.diseasesUrl = this.appConfig.getDiseasesPath
    this.diseaseItemUrl = this.appConfig.getDiseasesPath + '/'
    this.personItemUrl = this.appConfig.getPersonPath + '/'
  }


// EXTRA METHODES:....................................................................

  /*** TO GET ALL PERSON: ***/
  getAll(queryParam?: HttpParams): any {
    return this.httpClient.get<Response>(this.diseasesUrl, {params: queryParam})
      .pipe(map((res: Response) => res))
  }

  /*** TO GET ALL PERSON: ***/
  getAllByPersonId(patientId: uuid, queryParam?: HttpParams): any {
    return this.httpClient.get<Response>(
      this.personItemUrl + patientId + '/diseases', {params: queryParam})
      .pipe(map((res: Response) => res))
  }

  /*** TO GET ONE BY PERSON ID: ***/
  getOne(diseaseId: uuid): any {
    return this.httpClient.get(this.diseaseItemUrl + diseaseId)
      .pipe(map((res: any) => res))
  }

  /*** TO ADD A NEW PERSON ***/
  add(disease: IDiseaseTO): any {
    return this.httpClient.post(this.diseasesUrl, disease)
      .pipe(map((res: Response) => res))
  }

  /***  TO EDIT A PERSON ***/
  edit(diseaseId: uuid, update: IDisease): any {
    return this.httpClient.put(this.diseaseItemUrl + diseaseId, update)
  }

  /*** TO DELETE A PERSON ***/
  delete(diseaseId: uuid): any {
    return this.httpClient.delete(this.diseaseItemUrl + diseaseId)
  }

}
