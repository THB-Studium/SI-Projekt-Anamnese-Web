import { environment } from '../../environments/environment'
import { Injectable } from '@angular/core'
import { CONFIG, EnvConfig } from '../shared/const/env.config'

@Injectable()
export class AppConfigService {

  public get config(): EnvConfig {
    return CONFIG
  }


  // Administration paths:...............................
  public get getBaseUrl(): string {
    return environment.baseUrl
  }

  // Cessions paths
  public get getAuthenticationPath(): string {
    return this.getBaseUrl + '/sessions'
  }

  public get getAuthorityPath(): string {
    return this.getBaseUrl + '/my/authorities'
  }


  // DBs paths:.........................................
  public get getPersonPath(): string {
    return this.getBaseUrl + '/api/persons'
  }

  public get getMedicationInTakesPath(): string {
    return this.getBaseUrl + '/api/medication_in_takes'
  }

  public get getIllnessesPath(): string {
    return this.getBaseUrl + '/api/preExistingIllnesses'
  }

  public get getDiagnosisPath(): string {
    return this.getBaseUrl + '/api/diagnoses'
  }

  public get getVegetativeAnamnesisPath(): string {
    return this.getBaseUrl + '/api/vegetativeAnamnesis'
  }

  public get getFamilyAnamnesisPath(): string {
    return this.getBaseUrl + '/api/familyAnamnesis'
  }

  public get getDiseasesPath(): string {
    return this.getBaseUrl + '/api/diseases'
  }

  public get getAllergyPath(): string {
    return this.getBaseUrl + '/api/allergies'
  }

}
