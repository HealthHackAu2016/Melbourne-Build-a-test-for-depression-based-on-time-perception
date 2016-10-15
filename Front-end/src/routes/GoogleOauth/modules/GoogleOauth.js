import axios from 'axios'
import { push } from 'react-router-redux'
import { setCurrentUser, authSet } from 'redux/session.js'
import errorHandler from 'utils/errorHandler'
import { googleOauthParams } from 'globalVar.js'
// ------------------------------------
// Constants
// ------------------------------------

export const GOOGLE_OAUTH_START = 'GOOGLE_OAUTH_START'
export const GOOGLE_OAUTH_FINISH = 'GOOGLE_OAUTH_FINISH'
export const GOOGLE_OAUTH_ERROR = 'GOOGLE_OAUTH_ERROR'
// ------------------------------------
// Actions
// ------------------------------------

export const googleOauthStart = () => ({type: GOOGLE_OAUTH_START})
export const googleOauthFinish = () => ({type: GOOGLE_OAUTH_FINISH})
export const googleOauthError = (error) => ({ type: GOOGLE_OAUTH_ERROR, payload: error })

// ------------------------------------
// Thunk Actions
// ------------------------------------

export const googleLogin = (code) => (dispatch) => {
  const params = { ...googleOauthParams.params, code }
  const url = googleOauthParams.url
  dispatch(googleOauthStart())
  axios.post(url, params)
  .then((response) => {
    localStorage.setItem('token', response.data.token)
    dispatch(setCurrentUser(response.data.user))
    dispatch(authSet(true))
    dispatch(googleOauthFinish())
    dispatch(push('/'))
  })
  .catch((error) => errorHandler(error, dispatch, googleOauthError))
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GOOGLE_OAUTH_START]: (state) => ({
    ...state,
    loading: true,
    error: { message: '', status: false } // reset error on auth start
  }),
  [GOOGLE_OAUTH_FINISH]: (state) => ({
    ...state,
    loading: false
  }),
  [GOOGLE_OAUTH_ERROR]: (state, action) => ({
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
export default function GoogleOauthReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
