import axios from 'axios'
import { apiUrl } from 'globalVar.js'
import errorHandler from 'utils/errorHandler'
import {authSet, setCurrentUser} from 'redux/session'

// ------------------------------------
// Constants
// ------------------------------------

export const PROFILE_FETCH_START = 'PROFILE_FETCH_START'
export const PROFILE_FETCH_FINISH = 'PROFILE_FETCH_FINISH'
export const PROFILE_FETCH_ERROR = 'PROFILE_FETCH_ERROR'
export const PROFILE_IS_OWNER = 'PROFILE_IS_OWNER'
export const POLL_DELETE_START = 'POLL_DELETE_START'
export const POLL_DELETE_FINISH = 'POLL_DELETE_FINISH'
export const POLL_DELETE_ERROR = 'POLL_DELETE_ERROR'
// ------------------------------------
// Actions
// ------------------------------------

export const pollDeleteStart = () => ({type: POLL_DELETE_START})
export const pollDeleteFinish = (data) => ({type: POLL_DELETE_FINISH, payload: data})
export const pollDeleteError = (error) => ({type: POLL_DELETE_ERROR, payload: error})
export const profileIsOwner = (value) => ({type: PROFILE_IS_OWNER, payload: value})

export const profileFetchStart = () => ({type: PROFILE_FETCH_START})
export const profileFetchFinish = (data) => ({type: PROFILE_FETCH_FINISH, payload: data})
export const profileFetchError = (error) => ({type: PROFILE_FETCH_ERROR, payload: error})
// ------------------------------------
// Thunk Actions
// ------------------------------------

export const profileFetch = (userId) => (dispatch, getState) => {
  const token = localStorage.getItem('token')
  let {authenticated, currentUser} = getState().session
  // if there is already user.id and token and authernticated
  if (currentUser._id && token && authenticated) {
    if (currentUser._id === userId) {
      dispatch(profileIsOwner(true))
    } else {
      dispatch(profileIsOwner(false))
    }
    dispatch(profileFetchStart())
    axios.get(`${apiUrl}/user/profile/${userId}`)
    .then((response) => {
      if (response.data._id) {
        return dispatch(profileFetchFinish({...response.data, polls: []}))
      }
      return dispatch(profileFetchFinish({
        _id: response.data[0].createdBy._id,
        firstName: response.data[0].createdBy.firstName,
        lastName: response.data[0].createdBy.lastName,
        polls: response.data
      }))
    })
    .catch((error) => errorHandler(error, dispatch, profileFetchError))
  }

  // if user was previously log in and haven't yet logged out.
  if (!currentUser._id && token) {
    axios.get(`${apiUrl}/user/profile`, {
      headers: { authorization: token }
    })
    .then((response) => {
      dispatch(setCurrentUser(response.data.user))
      dispatch(authSet(true))
      authenticated = getState().session.authenticated
      currentUser = getState().session.currentUser
      if (authenticated) {
        if (currentUser._id === userId) {
          dispatch(profileIsOwner(true))
        }
      } else {
        dispatch(profileIsOwner(false))
      }

      dispatch(profileFetchStart())
      axios.get(`${apiUrl}/user/profile/${userId}`)
      .then((response) => {
        if (response.data._id) {
          return dispatch(profileFetchFinish({...response.data, polls: []}))
        }
        return dispatch(profileFetchFinish({
          _id: response.data[0].createdBy._id,
          firstName: response.data[0].createdBy.firstName,
          lastName: response.data[0].createdBy.lastName,
          polls: response.data
        }))
      })
      .catch((error) => errorHandler(error, dispatch, profileFetchError))
    })
    .catch((error) => {
      console.log(error)
      localStorage.removeItem('token')
    })
  }

  // if user is a public user then just fetch the polls
  if (userId) {
    axios.get(`${apiUrl}/user/profile/${userId}`)
    .then((response) => {
      if (response.data._id) {
        return dispatch(profileFetchFinish({...response.data, polls: []}))
      }
      return dispatch(profileFetchFinish({
        _id: response.data[0].createdBy._id,
        firstName: response.data[0].createdBy.firstName,
        lastName: response.data[0].createdBy.lastName,
        polls: response.data
      }))
    })
    .catch((error) => errorHandler(error, dispatch, profileFetchError))
  }
}

export const pollDelete = (userId, pollId) => (dispatch, getState) => {
  const {currentUser, authenticated} = getState().session
  dispatch(pollDeleteStart())
  if (authenticated && currentUser._id === userId) {
    axios.delete(`${apiUrl}/poll/${pollId}`,
      {headers: { authorization: localStorage.getItem('token') }}
    )
    .then((response) => {
      console.log(response.data)
      dispatch(pollDeleteFinish(response.data.poll._id))
    })
    .catch((error) => errorHandler(error, dispatch, pollDeleteError))
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [POLL_DELETE_START]: (state) => ({
    ...state,
    loading: {type: 'delete', status: true},
    error: { message: '', status: false },
    successMessage: ''
  }),
  [POLL_DELETE_FINISH]: (state, action) => {
    const polls = state.polls.filter((poll) => poll._id !== action.payload)
    if (polls.length === 0) {
      return {
        ...state,
        loading: {type: '', status: false},
        successMessage: 'The poll was deleted',
        polls: []
      }
    } else {
      return {
        ...state,
        loading: {type: '', status: false},
        successMessage: 'The poll was deleted',
        polls: polls
      }
    }
  },
  [POLL_DELETE_ERROR]: (state, action) => ({
    ...state,
    error: action.payload,
    loading: {type: '', status: false},
    successMessage: ''
  }),
  [PROFILE_IS_OWNER]: (state, action) => ({
    ...state,
    isOwner: action.payload
  }),
  [PROFILE_FETCH_START]: (state) => ({
    ...state,
    loading: {type: 'fetch', status: true},
    error: { message: '', status: false }
  }),
  [PROFILE_FETCH_FINISH]: (state, action) => ({
    ...state,
    loading: {type: '', status: false},
    _id: action.payload._id,
    firstName: action.payload.firstName,
    lastName: action.payload.lastName,
    polls: action.payload.polls
  }),
  [PROFILE_FETCH_ERROR]: (state, action) => ({
    ...state,
    error: action.payload,
    loading: {type: '', status: false}
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  loading: {
    type: '',
    status: false
  },
  successMessage: '',
  isOwner: false,
  firstName: '',
  lastName: '',
  _id: '',
  polls: [],
  error: {
    message: '',
    status: false
  }
}
export default function ProfileReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
