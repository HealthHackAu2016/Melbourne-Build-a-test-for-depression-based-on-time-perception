import axios from 'axios'
import { apiUrl } from 'globalVar.js'
import errorHandler from 'utils/errorHandler'
// ------------------------------------
// Constants
// ------------------------------------

export const Usersup _START = 'Usersup _START'
export const Usersup _FINISH = 'Usersup _FINISH'
export const Usersup _ERROR = 'Usersup _ERROR'
// ------------------------------------
// Actions
// ------------------------------------

export const UsersStart = () => ({type: Usersup _START})
export const UsersFinish = () => ({type: Usersup _FINISH})
export const UsersError = (error) => ({type: Usersup _ERROR, payload: error})
// ------------------------------------
// Thunk Actions
// ------------------------------------

export const Users = () => (dispatch, getState) => {

}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [Usersup _START]: (state) => ({
    ...state,
    loading: true,
    error: { message: '', status: false }
  }),
  [Usersup _FINISH]: (state, action) => ({
    ...state,
    loading: false
  }),
  [Usersup _ERROR]: (state, action) => ({
    ...state,
    error: action.payload,
    loading: false
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  loading: false,
  error: {
    message: '',
    status: false
  }
}

export default function UsersReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
