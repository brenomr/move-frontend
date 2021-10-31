/**
 * User state interface.
 */
export interface IUserState {
  id: string | null,
  email: string
  name: string
  signed: boolean
  whois: TWhoIs
  avatar: string
}

export type TWhoIs = EWhoIs | null

export enum EWhoIs {
  STUDENT = 'student',
  PERSONAL = 'personal',
  ADMIN = 'admin'
}