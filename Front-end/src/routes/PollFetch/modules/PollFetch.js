import axios from 'axios'
import { apiUrl } from 'globalVar.js'
import errorHandler from 'utils/errorHandler'

// ------------------------------------
// Constants
// ------------------------------------

export const POLL_FETCH_START = 'POLL_FETCH_START'
export const POLL_FETCH_FINISH = 'POLL_FETCH_FINISH'
export const POLL_FETCH_ERROR = 'POLL_FETCH_ERROR'

export const POLL_VOTE_START = 'POLL_VOTE_START'
export const POLL_VOTE_FINISH = 'POLL_VOTE_FINISH'
export const POLL_VOTE_ERROR = 'POLL_VOTE_ERROR'
export const RESET_STATE = 'RESET_STATE'

// ------------------------------------
// Actions
// ------------------------------------

export const pollVoteStart = () => ({type: POLL_VOTE_START})
export const pollVoteFinish = (data, message) => ({type: POLL_VOTE_FINISH, payload: {poll: data, message}})
export const pollVoteError = (error) => ({type: POLL_VOTE_ERROR, payload: error})

export const pollFetchStart = () => ({type: POLL_FETCH_START})
export const pollFetchFinish = (data) => ({type: POLL_FETCH_FINISH, payload: data})
export const pollFetchError = (error) => ({type: POLL_FETCH_ERROR, payload: error})
export const resetToInitialState = () => ({type: RESET_STATE})
// ------------------------------------
// Thunk Actions
// ------------------------------------

export const pollFetch = (id) => (dispatch, getState) => {
  dispatch(pollFetchStart())
  axios.get(`${apiUrl}/poll/${id}`)
  .then((response) => {
    dispatch(pollFetchFinish(response.data.poll))
  })
  .catch((error) => errorHandler(error, dispatch, pollFetchError))
}

export const pollVote = (optionId) => (dispatch, getState) => {
  const pollId = getState().PollFetch.poll._id
  dispatch(pollVoteStart())
  axios.put(`${apiUrl}/poll/vote/${pollId}`, {options: {_id: optionId}})
  .then((response) => {
    // fill in the createBy fields
    const pollWithCreateBy = {
      ...response.data.poll,
      createdBy: getState().PollFetch.poll.createdBy
    }
    dispatch(pollVoteFinish(pollWithCreateBy, response.data.message))
  })
  .catch((error) => errorHandler(error, dispatch, pollVoteError))
}

export const resetError = () => (dispatch) => {
  dispatch(pollVoteError({message: '', status: false}))
}

const initialState = {
  successMessage: '',
  loading: false,
  poll: {
    _id: '',
    voters: [],
    updatedAt: '',
    createdAt: '',
    question: '',
    createdBy: {
      _id: '',
      firstName: '',
      lastName: ''
    },
    options: [
      {
        name: '',
        _id: '',
        votes: 0
      }
    ],
    hasVoted: false
  },
  error: {
    message: '',
    status: false
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [POLL_FETCH_START]: (state) => ({
    ...state,
    loading: true,
    error: { message: '', status: false }
  }),
  [POLL_FETCH_FINISH]: (state, action) => ({
    ...state,
    loading: false,
    poll: action.payload
  }),
  [POLL_FETCH_ERROR]: (state, action) => ({
    ...state,
    error: action.payload,
    loading: false
  }),
  [POLL_VOTE_START]: (state) => ({
    ...state,
    loading: true,
    error: { message: '', status: false },
    successMessage: ''
  }),
  [POLL_VOTE_FINISH]: (state, action) => ({
    ...state,
    loading: false,
    poll: action.payload.poll,
    successMessage: action.payload.message
  }),
  [POLL_VOTE_ERROR]: (state, action) => ({
    ...state,
    error: action.payload,
    loading: false
  }),
  [RESET_STATE]: (state) => initialState
}

// ------------------------------------
// Reducer
// ------------------------------------

export default function PollFetchReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
