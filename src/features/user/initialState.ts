/**
 * IMPORTS
 */
import { IUserState } from './index.d'

/**
 * I define the user initial state.
 */
const initialState: IUserState = {
  id: null,
  email: '',
  name: '',
  signed: false,
  whois: null
}

/**
 * EXPORTS
 */
export default initialState