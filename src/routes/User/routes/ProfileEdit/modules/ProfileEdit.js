import axios from 'axios'
import { push } from 'react-router-redux'
import { apiUrl } from 'globalVar.js'
import errorHandler from 'utils/errorHandler'
// ------------------------------------
// Constants
// ------------------------------------

export const USER_PROFILE_EDIT_START = 'USER_PROFILE_EDIT_START'
export const USER_PROFILE_EDIT_FINISH = 'USER_PROFILE_EDIT_FINISH'
export const USER_PROFILE_EDIT_ERROR = 'USER_PROFILE_EDIT_ERROR'
export const USER_PROFILE_EDIT_FORM_PRELOAD = 'USER_PROFILE_EDIT_FORM_PRELOAD'

// ------------------------------------
// Actions
// ------------------------------------
export const userProfileEditStart = () => ({type: USER_PROFILE_EDIT_START})
export const userProfileEditFinish = (message, user) => ({
  type: USER_PROFILE_EDIT_FINISH, payload: { message, user }
})
export const userProfileEditError = (error) => ({
  type: USER_PROFILE_EDIT_ERROR, payload: error
})
export const userProfileEditFormPreload = (user) => ({
  type: USER_PROFILE_EDIT_FORM_PRELOAD, payload: user
})
// ------------------------------------
// Thunk Actions
// ------------------------------------

export const userProfileUpdate = ({firstName, lastName, email, gender, location, website}) => (dispatch, getState) => {
  if (getState().session.authenticated) {
    dispatch(userProfileEditStart())

    axios.put(`${apiUrl}/user/profile/edit`,
      {firstName, lastName, email, gender, location, website},
      {headers: { authorization: localStorage.getItem('token') }},
    )
    .then((response) => {
      dispatch(userProfileEditFinish(response.data.message, response.data.user))
      // call to server to get update of the change
      getUserProfile()
    })
    .catch((error) => errorHandler(error, dispatch, userProfileEditError))
  } else {
    dispatch(push('/signin'))
  }
}

export const getUserProfile = () => (dispatch, getState) => {
  axios.get(`${apiUrl}/user/profile`,
    {headers: { authorization: localStorage.getItem('token') }},
  )
  .then((res) => {
    dispatch(userProfileEditFormPreload(res.data.user))
  })
  // if err just return empty user profile object for now
  .catch((err) => {
    console.log(err.response)
    dispatch(userProfileEditFormPreload({}))
  })
}
// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [USER_PROFILE_EDIT_START]: (state) => ({
    ...state,
    loading: true,
    successMessage: '',
    error: { message: '', status: false } // reset error on auth start
  }),
  [USER_PROFILE_EDIT_FINISH]: (state, action) => ({
    ...state,
    successMessage: action.payload.message,
    userProfile: action.payload.user,
    loading: false
  }),
  [USER_PROFILE_EDIT_ERROR]: (state, action) => ({
    ...state,
    error: action.payload,
    loading: false
  }),
  [USER_PROFILE_EDIT_FORM_PRELOAD]: (state, action) => ({
    ...state,
    userProfile: action.payload
  })
}
// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  successMessage: '',
  userProfile: {},
  loading: false,
  error: {
    message: '',
    status: false
  }
}

export default function UserProfileEditReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
