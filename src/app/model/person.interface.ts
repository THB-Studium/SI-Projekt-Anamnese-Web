import { v4 as uuid } from 'uuid'
import { IAddress } from './address.interface'

export interface IPerson {
  id?: uuid

  userName: string
  passWord?: string
  security: ISecurity

  firstName?: string
  lastName?: string
  profession?: string
  address: IAddress
  phoneNumber?: string
  email?: string
  maritalStatus?: string
  children?: boolean

  gender?: string
  height?: number
  weight?: number
  allergies?: Array<IAllergy>

  type?: string
  recorded?: boolean
}
export interface IPersonTO {
  userName: string
  password?: string

  // Security:
  secretQuestion: string
  answer?: string

  firstName?: string
  lastName?: string
  profession?: string

  // Address:
  streetAndNumber?: string
  postalCode?: string
  country?: string
  city?: string

  phoneNumber?: string
  email?: string
  maritalStatus?: string
  children?: boolean

  gender?: string
  height?: number
  weight?: number
  allergyNames?: Array<string>

  type?: string
  recorded?: boolean
}

export interface ISecurity {
  id: uuid,
  secretQuestion: string,
  answer: string
}

export interface IAllergy {
  name: string,
  id: uuid,
}

export interface IAllergyTO {
  allergies: Array<string>,
  patientId: uuid,
}

export interface IResetPasswordTO {
  password: string
}
