import { v4 as uuid } from 'uuid'
import { IPerson } from './person.interface'

export interface IDiagnosis {
  id?: uuid
  person?: IPerson
  examinationName?: string
  examinationDate?: Date
  bodyRegion?: string
}

export interface IDiagnosisTO {
  personId?: uuid
  examinationName?: string
  examinationDate?: Date
  bodyRegion?: string
}
