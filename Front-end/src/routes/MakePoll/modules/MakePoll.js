import axios from 'axios'
import { push } from 'react-router-redux'
import { apiUrl } from 'globalVar.js'
import errorHandler from 'utils/errorHandler'
import { capitalizeFirstLetter } from 'utils/general'
import { reset } from 'redux-form'
// ------------------------------------
// Constants
// ------------------------------------

export const MAKE_POLL_START = 'MAKE_POLL_START'
export const MAKE_POLL_FINISH = 'MAKE_POLL_FINISH'
export const MAKE_POLL_ERROR = 'MAKE_POLL_ERROR'

// ------------------------------------
// Actions
// ------------------------------------
export const makePollStart = () => ({type: MAKE_POLL_START})
export const makePollFinish = (message, poll) => ({
  type: MAKE_POLL_FINISH, payload: { message, poll }
})
export const makePollError = (error) => ({
  type: MAKE_POLL_ERROR, payload: error
})
// ------------------------------------
// Thunk Actions
// ------------------------------------

export const makePoll = (fields) => (dispatch, getState) => {
  if (getState().session.authenticated) {
    dispatch(makePollStart())
    const options = Object.keys(fields).map((name) => {
      if (name.includes('option')) return { name: capitalizeFirstLetter(fields[name]) }
    })
    .filter((option) => option !== undefined)
    const payload = {
      question: capitalizeFirstLetter(fields.question),
      options,
      createdBy: getState().session.currentUser._id
    }

    axios.post(`${apiUrl}/poll`, payload,
      {headers: { authorization: localStorage.getItem('token') }},
    )
    .then((response) => {
      dispatch(makePollFinish(response.data.message, response.data.poll))
      dispatch(reset('MakePoll'))
    })
    .catch((error) => errorHandler(error, dispatch, makePollError))
  } else {
    dispatch(push('/signin'))
  }
}
// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [MAKE_POLL_START]: (state) => ({
    ...state,
    loading: true,
    successMessage: '',
    error: { message: '', status: false } // reset error on auth start
  }),
  [MAKE_POLL_FINISH]: (state, action) => ({
    ...state,
    successMessage: action.payload.message,
    poll: action.payload.poll,
    loading: false
  }),
  [MAKE_POLL_ERROR]: (state, action) => ({
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
  poll: {id: ''},
  error: {
    message: '',
    status: false
  }
}

export default function MakePollReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
