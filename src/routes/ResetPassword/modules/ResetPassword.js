import axios from 'axios'
import { apiUrl } from 'globalVar.js'
import { reset } from 'redux-form'
import errorHandler from 'utils/errorHandler'

// ------------------------------------
// Constants
// ------------------------------------

export const RESET_PASSWORD_START = 'RESET_PASSWORD_START'
export const RESET_PASSWORD_FINISH = 'RESET_PASSWORD_FINISH'
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR'
// ------------------------------------
// Actions
// ------------------------------------

export const resetPasswordStart = () => ({type: RESET_PASSWORD_START})
export const resetPasswordFinish = (message) => ({type: RESET_PASSWORD_FINISH, payload: message})
export const resetPasswordError = (error) => ({type: RESET_PASSWORD_ERROR, payload: error})
// ------------------------------------
// Thunk Actions
// ------------------------------------

export const resetPassword = ({password, token}) => (dispatch) => {
  dispatch(resetPasswordStart())

  axios.post(`${apiUrl}/reset_password/${token}`, {password, token})
  .then((response) => {
    dispatch(resetPasswordFinish(response.data.message))
  })
  .catch((error) => {
    errorHandler(error, dispatch, resetPasswordError)
    dispatch(reset('resetPassword'))
  })
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [RESET_PASSWORD_START]: (state) => ({
    ...state,
    loading: true,
    successMessage: '',
    error: { message: '', status: false } // reset error on start
  }),
  [RESET_PASSWORD_FINISH]: (state, action) => ({
    ...state,
    successMessage: action.payload,
    loading: false
  }),
  [RESET_PASSWORD_ERROR]: (state, action) => ({
    ...state,
    error: action.payload,
    loading: false
  })
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  successMessage: '',
  loading: false,
  error: {
    message: '',
    status: false
  }
}
export default function resetPasswordReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
