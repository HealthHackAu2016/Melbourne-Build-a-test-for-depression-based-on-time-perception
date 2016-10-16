import axios from 'axios'
import { apiUrl } from 'globalVar.js'
import errorHandler from 'utils/errorHandler'
// ------------------------------------
// Constants
// ------------------------------------

export const HOME_FETCH_START = 'HOME_FETCH_START'
export const HOME_FETCH_FINISH = 'HOME_FETCH_FINISH'
export const HOME_FETCH_ERROR = 'HOME_FETCH_ERROR'
export const RESET_ERROR = 'RESET_ERROR'
// ------------------------------------
// Actions
// ------------------------------------

export const homeFetchStart = () => ({type: HOME_FETCH_START})
export const homeFetchFinish = (data) => ({type: HOME_FETCH_FINISH, payload: data})
export const homeFetchError = (error) => ({type: HOME_FETCH_ERROR, payload: error})
export const resetError = () => ({type: RESET_ERROR})
// ------------------------------------
// Thunk Actions
// ------------------------------------

export const homeFetch = () => (dispatch, getState) => {
  dispatch(homeFetchStart())
  axios.get(`${apiUrl}/poll`)
  .then((response) => {
    console.log(response.data)
    dispatch(homeFetchFinish(response.data))
  })
  .catch((error) => errorHandler(error, dispatch, homeFetchError))
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [HOME_FETCH_START]: (state) => ({
    ...state,
    loading: true,
    error: { message: '', status: false }
  }),
  [HOME_FETCH_FINISH]: (state, action) => ({
    ...state,
    loading: false,
    polls: action.payload
  }),
  [HOME_FETCH_ERROR]: (state, action) => ({
    ...state,
    error: action.payload,
    loading: false
  }),
  [RESET_ERROR]: (state) => ({
    ...state, error: { message: '', status: false }
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  loading: false,
  polls: [],
  error: {
    message: '',
    status: false
  }
}

export default function HomeReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
