import axios from 'axios'
import { push } from 'react-router-redux'
import { apiUrl } from 'globalVar.js'
import errorHandler from 'utils/errorHandler'
// ------------------------------------
// Constants
// ------------------------------------

export const ACCOUNT_DELETE_START = 'ACCOUNT_DELETE_START'
export const ACCOUNT_DELETE_FINISH = 'ACCOUNT_DELETE_FINISH'
export const ACCOUNT_DELETE_ERROR = 'ACCOUNT_DELETE_ERROR'

export const accountDeleteStart = () => ({type: ACCOUNT_DELETE_START})
export const accountDeleteFinish = (message) => ({
  type: ACCOUNT_DELETE_FINISH, payload: message
})
export const accountDeleteError = (error) => ({
  type: ACCOUNT_DELETE_ERROR, payload: error
})

// ------------------------------------
// Thunk Actions
// ------------------------------------

export const accountDelete = () => (dispatch, getState) => {
  if (getState().session.authenticated) {
    dispatch(accountDeleteStart())

    axios.delete(`${apiUrl}/user/account`,
      {headers: { authorization: localStorage.getItem('token') }}
    )
    .then((response) => {
      dispatch(accountDeleteFinish(response.data.message))
    })
    .catch((error) => errorHandler(error, dispatch, accountDeleteError))
  } else {
    dispatch(push('/signin'))
  }
}
// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [ACCOUNT_DELETE_START]: (state) => ({
    ...state,
    loading: true,
    successMessage: '',
    error: { message: '', status: false } // reset error on auth start
  }),
  [ACCOUNT_DELETE_FINISH]: (state, action) => ({
    ...state,
    successMessage: action.payload,
    loading: false
  }),
  [ACCOUNT_DELETE_ERROR]: (state, action) => ({
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

export default function UserSettingsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
