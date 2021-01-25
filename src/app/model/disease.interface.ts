import { v4 as uuid } from 'uuid'
import { IPerson } from './person.interface'
import { IIllness } from './illness.interface'

export interface IDisease {
  id?: uuid
  person?: IPerson
  undergoneSurgery?: boolean
  surgeriesDetails?: string
  preExistingIllnesses?: Array<IIllness>
}

export interface IDiseaseTO {
  patientId?: uuid
  undergoneSurgery?: boolean
  surgeriesDetails?: string
  preExistingIllnesses?: Array<IIllness>
}
