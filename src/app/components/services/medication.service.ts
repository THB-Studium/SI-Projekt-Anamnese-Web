import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { v4 as uuid } from 'uuid'
import { AppConfigService } from '../../core/app-config.service'
import { IMedication, IMedicationTO } from '../../model/medication.interface'


@Injectable({providedIn: 'root'})
export class MedicationService {
  private readonly medicationUrl: string
  private readonly medicationItemUrl: string
  private readonly personItemUrl: string

  constructor(
    private httpClient: HttpClient,
    private appConfig: AppConfigService,
  ) {
    this.medicationUrl = this.appConfig.getMedicationInTakesPath
    this.medicationItemUrl = this.appConfig.getMedicationInTakesPath + '/'
    this.personItemUrl = this.appConfig.getPersonPath + '/'
  }


// EXTRA METHODES:....................................................................

  /*** TO GET ALL MEDICATION: ***/
  getAll(queryParam?: HttpParams): any {
    return this.httpClient.get<Response>(this.medicationUrl, {params: queryParam})
      .pipe(map((res: Response) => res))
  }

  /*** TO GET ALL MEDICATION: ***/
  getAllByPatientId(patientId: uuid, queryParam?: HttpParams): any {
    return this.httpClient.get<Response>(
      this.personItemUrl + patientId + '/medication_in_takes', {params: queryParam})
      .pipe(map((res: Response) => res))
  }

  /*** TO GET ONE BY MEDICATION ID: ***/
  getOne(medicationId: uuid): any {
    return this.httpClient.get(this.medicationItemUrl + medicationId)
      .pipe(map((res: any) => res))
  }

  /*** TO ADD A NEW MEDICATION ***/
  add(medication: IMedicationTO): any {
    return this.httpClient.post(this.medicationUrl, medication)
      .pipe(map((res: Response) => res))
  }

  /***  TO EDIT A MEDICATION ***/
  edit(medicationId: uuid, update: IMedication): any {
    return this.httpClient.put(this.medicationItemUrl + medicationId, update)
  }

  /*** TO DELETE A MEDICATION ***/
  delete(medicationId: uuid): any {
    return this.httpClient.delete(this.medicationItemUrl + medicationId)
  }

}
