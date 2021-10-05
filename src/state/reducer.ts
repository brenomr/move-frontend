/**
 * IMPORTS
 */
import user from 'features/user'
import { combineReducers } from 'redux'

/**
 * I create a root reducer.
 */
const reducer = combineReducers({
    [user.name]: user.reducer
})

/**
 * EXPORTS
 */
export type IRootState = ReturnType<typeof reducer>
export default reducer