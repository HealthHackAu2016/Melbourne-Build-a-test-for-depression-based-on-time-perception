import axios from 'axios'
import { push } from 'react-router-redux'
import { setCurrentUser, authSet } from 'redux/session.js'
import { apiUrl } from 'globalVar.js'
import errorHandler from 'utils/errorHandler'

// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN_START = 'LOGIN_START'
export const LOGIN_FINISH = 'LOGIN_FINISH'
export const LOGIN_ERROR = 'LOGIN_ERROR'

// ------------------------------------
// Actions
// ------------------------------------
export const loginStart = () => ({type: LOGIN_START})
export const loginFinish = () => ({type: LOGIN_FINISH})
export const loginError = (error) => ({ type: LOGIN_ERROR, payload: error })

// ------------------------------------
// Thunk Actions
// ------------------------------------

export const emailLogin = ({email, password, rememberMe}) => (dispatch, getState) => {
  dispatch(loginStart())
  // submit email password to server
  axios.post(`${apiUrl}/login`, {
    email, password, rememberMe: JSON.stringify(rememberMe)
  })
  .then((response) => {
    // save the JWT token to local storage
    localStorage.setItem('token', response.data.token)
    dispatch(setCurrentUser(response.data.user))
  })
  .then(() => {
    dispatch(authSet(true))
    // update state to indicate user is authenticated
    setTimeout(function() {
      dispatch(loginFinish())
      // redirect to the route /feature
      dispatch(push('/'))
    }, 300) // add slight delay for loader to draw for ux
  })
  .catch((error) => errorHandler(error, dispatch, loginError))
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOGIN_START]: (state) => ({
    ...state,
    loading: true,
    error: { message: '', status: false } // reset error on auth start
  }),
  [LOGIN_FINISH]: (state) => ({
    ...state,
    loading: false
  }),
  [LOGIN_ERROR]: (state, action) => ({
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

export default function loginReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
