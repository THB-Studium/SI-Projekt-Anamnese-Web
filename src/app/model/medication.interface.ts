import { v4 as uuid } from 'uuid'
import { IPerson } from './person.interface'

export interface IMedication {
  id?: uuid
  person?: IPerson
  designation?: string
  dosage?: string
  startDate?: Date
  bloodDiluent?: boolean
}

export interface IMedicationTO {
  patientId?: uuid
  designation?: string
  dosage?: string
  startDate?: Date
  bloodDiluent?: boolean
}
