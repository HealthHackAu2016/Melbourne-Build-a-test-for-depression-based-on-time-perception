import axios from 'axios'
import { apiUrl } from 'globalVar.js'
import errorHandler from 'utils/errorHandler'
// ------------------------------------
// Constants
// ------------------------------------

export const LEVEL1_START = 'LEVEL1_START'
export const LEVEL1_FINISH = 'LEVEL1_FINISH'
export const LEVEL1_ERROR = 'LEVEL1_ERROR'
// ------------------------------------
// Actions
// ------------------------------------

export const Level1Start = () => ({type: LEVEL1_START})
export const Level1Finish = () => ({type: LEVEL1_FINISH})
export const Level1Error = (error) => ({type: LEVEL1_ERROR, payload: error})
// ------------------------------------
// Thunk Actions
// ------------------------------------

export const level1 = () => (dispatch, getState) => {
  console.log('level 1 start')
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LEVEL1_START]: (state) => ({
    ...state,
    loading: true,
    error: { message: '', status: false }
  }),
  [LEVEL1_FINISH]: (state, action) => ({
    ...state,
    loading: false
  }),
  [LEVEL1_ERROR]: (state, action) => ({
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

export default function Level1Reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
