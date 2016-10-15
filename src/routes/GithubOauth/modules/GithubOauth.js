import axios from 'axios'
import { push } from 'react-router-redux'
import { setCurrentUser, authSet } from 'redux/session.js'
import { githubOauthParams } from 'globalVar.js'
import errorHandler from 'utils/errorHandler'
// ------------------------------------
// Constants
// ------------------------------------

export const GITHUB_OAUTH_START = 'GITHUB_OAUTH_START'
export const GITHUB_OAUTH_FINISH = 'GITHUB_OAUTH_FINISH'
export const GITHUB_OAUTH_ERROR = 'GITHUB_OAUTH_ERROR'
// ------------------------------------
// Actions
// ------------------------------------

export const githubOauthStart = () => ({type: GITHUB_OAUTH_START})
export const githubOauthFinish = () => ({type: GITHUB_OAUTH_FINISH})
export const githubOauthError = (error) => ({ type: GITHUB_OAUTH_ERROR, payload: error })
// ------------------------------------
// Thunk Actions
// ------------------------------------

export const githubLogin = (code) => (dispatch, getState) => {
  const params = { ...githubOauthParams.params, code }
  const url = githubOauthParams.url
  dispatch(githubOauthStart())
  axios.post(url, params)
  .then((response) => {
    localStorage.setItem('token', response.data.token)
    dispatch(setCurrentUser(response.data.user))
    dispatch(authSet(true))
    dispatch(githubOauthFinish())
    dispatch(push('/'))
  })
  .catch((error) => errorHandler(error, dispatch, githubOauthError))
}
// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [GITHUB_OAUTH_START]: (state) => ({
    ...state,
    loading: true,
    error: { message: '', status: false } // reset error on auth start
  }),
  [GITHUB_OAUTH_FINISH]: (state) => ({
    ...state,
    loading: false
  }),
  [GITHUB_OAUTH_ERROR]: (state, action) => ({
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
export default function GithubOauthReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
