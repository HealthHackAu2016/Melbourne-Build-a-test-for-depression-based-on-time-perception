import axios from 'axios'
import { apiUrl } from 'globalVar.js'
import errorHandler from 'utils/errorHandler'
// ------------------------------------
// Constants
// ------------------------------------

export const TEST_START = 'TEST _START'
export const TEST_FINISH = 'TEST _FINISH'
export const TEST_ERROR = 'TEST _ERROR'
// ------------------------------------
// Actions
// ------------------------------------

export const TestStart = () => ({type: TEST_START})
export const TestFinish = () => ({type: TEST_FINISH})
export const TestError = (error) => ({type: TEST_ERROR, payload: error})
// ------------------------------------
// Thunk Actions
// ------------------------------------

export const test = () => (dispatch, getState) => {

}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [TEST_START]: (state) => ({
    ...state,
    loading: true,
    error: { message: '', status: false }
  }),
  [TEST_FINISH]: (state, action) => ({
    ...state,
    loading: false
  }),
  [TEST_ERROR]: (state, action) => ({
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

export default function TestReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
