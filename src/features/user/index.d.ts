/**
 * User state interface.
 */
export interface IUserState {
  id: string | null,
  email: string
  name: string
  signed: boolean
  whois: TWhoIs
}

export type TWhoIs = EWhoIs.STUDENT | EWhoIs.PERSONAL | null

export enum EWhoIs {
  STUDENT = 'student',
  PERSONAL = 'personal'
}