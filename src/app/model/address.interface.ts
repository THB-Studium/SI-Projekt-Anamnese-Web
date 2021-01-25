import { v4 as uuid } from 'uuid'

export interface IAddress {
  id?: uuid
  streetAndNumber?: string
  postalCode?: string
  country?: string
  city?: string
}
