import axios from 'axios'
import { push } from 'react-router-redux'
import { apiUrl } from 'globalVar.js'

// Constants
export const CURRENT_USER = 'CURRENT_USER'
export const AUTH_SET = 'AUTH_SET'
export const LOG_OUT = 'LOG_OUT'
export const PING_SERVER = 'PING_SERVER'

// Actions
export const setCurrentUser = (user) => ({type: CURRENT_USER, payload: user})
export const authSet = (state) => ({type: AUTH_SET, payload: state})
export const pingServer = (state) => ({type: PING_SERVER, payload: state})
// ------------------------------------
// Thunk Actions
// ------------------------------------

export const logOut = () => (dispatch, getState) => {
  // reset the user
  dispatch(setCurrentUser(initialState.currentUser))
  dispatch(authSet(false))
  localStorage.removeItem('token')
  dispatch(push('/'))
}

export const getCurrentUser = () => (dispatch) => {
  axios.get(`${apiUrl}/user/profile`, {
    headers: { authorization: localStorage.getItem('token') }
  })
  .then((response) => {
    dispatch(setCurrentUser(response.data.user))
    dispatch(authSet(true))
  })
  .catch((error) => {
    console.log(error)
    localStorage.removeItem('token')
    dispatch(push('/login'))
  })
}

export const checkServerStatus = () => (dispatch, getState) => {
  axios.get(`${apiUrl}/ping`)
  .then((res) => dispatch(pingServer(res.data.state)))
}

// Reducer
const initialState = {
  currentUser: {
    firstName: '',
    lastName: '',
    picture: '',
    gender: '',
    _id: '',
    createdAt: '',
    email: ''
  },
  authenticated: false,
  // socket: null,
  serverOnline: false,
  error: null
}

// Actions Handlers
const ACTION_HANDLERS = {
  [CURRENT_USER]: (state, action) => ({
    ...state, currentUser: action.payload
  }),

  [AUTH_SET]: (state, action) => ({
    ...state, authenticated: action.payload
  }),

  [PING_SERVER]: (state, action) => ({
    ...state, serverOnline: true
  })

}

export default function Session(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
