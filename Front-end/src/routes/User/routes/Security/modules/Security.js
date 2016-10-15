import axios from 'axios'
import { reset } from 'redux-form'
import { push } from 'react-router-redux'
import { apiUrl } from 'globalVar.js'
import errorHandler from 'utils/errorHandler'

// ------------------------------------
// Constants
// ------------------------------------

export const PASSWORD_CHANGE_START = 'PASSWORD_CHANGE_START'
export const PASSWORD_CHANGE_FINISH = 'PASSWORD_CHANGE_FINISH'
export const PASSWORD_CHANGE_ERROR = 'PASSWORD_CHANGE_ERROR'

export const passwordChangeStart = () => ({type: PASSWORD_CHANGE_START})
export const passwordChangeFinish = (message) => ({
  type: PASSWORD_CHANGE_FINISH, payload: message
})
export const passwordChangeError = (error) => ({
  type: PASSWORD_CHANGE_ERROR, payload: error
})

// ------------------------------------
// Thunk Actions
// ------------------------------------

export const passwordChange = ({password}) => (dispatch, getState) => {
  if (getState().session.authenticated) {
    dispatch(passwordChangeStart())

    axios.put(`${apiUrl}/user/security`, {password},
      {headers: { authorization: localStorage.getItem('token') }}
    )
    .then((response) => {
      dispatch(passwordChangeFinish(response.data.message))
      dispatch(reset('passwordChange'))
    })
    .catch((error) => errorHandler(error, dispatch, passwordChangeError))
  } else {
    dispatch(push('/signin'))
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [PASSWORD_CHANGE_START]: (state) => ({
    ...state,
    loading: true,
    successMessage: '',
    error: { message: '', status: false } // reset error on auth start
  }),
  [PASSWORD_CHANGE_FINISH]: (state, action) => ({
    ...state,
    successMessage: action.payload,
    loading: false
  }),
  [PASSWORD_CHANGE_ERROR]: (state, action) => ({
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

export default function PasswordChange(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
