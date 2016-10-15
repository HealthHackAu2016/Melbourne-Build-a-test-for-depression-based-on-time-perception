import axios from 'axios'
import { apiUrl } from 'globalVar.js'
import { reset } from 'redux-form'
import errorHandler from 'utils/errorHandler'

// ------------------------------------
// Constants
// ------------------------------------

export const FORGOT_PASSWORD_START = 'FORGOT_PASSWORD_START'
export const FORGOT_PASSWORD_FINISH = 'FORGOT_PASSWORD_FINISH'
export const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR'
// ------------------------------------
// Actions
// ------------------------------------

export const forgotPasswordStart = () => ({type: FORGOT_PASSWORD_START})
export const forgotPasswordFinish = (message) => ({type: FORGOT_PASSWORD_FINISH, payload: message})
export const forgotPasswordError = (error) => ({type: FORGOT_PASSWORD_ERROR, payload: error})
// ------------------------------------
// Thunk Actions
// ------------------------------------

export const forgotPassword = ({email}) => (dispatch) => {
  dispatch(forgotPasswordStart())

  axios.post(`${apiUrl}/forgot_password`, {email})
  .then((response) => {
    dispatch(forgotPasswordFinish(response.data.message))
  })
  .catch((error) => {
    errorHandler(error, dispatch, forgotPasswordError)
    dispatch(reset('forgotPassword'))
  })
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [FORGOT_PASSWORD_START]: (state) => ({
    ...state,
    loading: true,
    successMessage: '',
    error: { message: '', status: false } // reset error on auth start
  }),
  [FORGOT_PASSWORD_FINISH]: (state, action) => ({
    ...state,
    successMessage: action.payload,
    loading: false
  }),
  [FORGOT_PASSWORD_ERROR]: (state, action) => ({
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
export default function forgotPasswordReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
