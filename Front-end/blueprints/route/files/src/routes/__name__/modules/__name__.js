import axios from 'axios'
import { apiUrl } from 'globalVar.js'
import errorHandler from 'utils/errorHandler'
// ------------------------------------
// Constants
// ------------------------------------

export const <%= pascalEntityName %>up _START = '<%= pascalEntityName %>up _START'
export const <%= pascalEntityName %>up _FINISH = '<%= pascalEntityName %>up _FINISH'
export const <%= pascalEntityName %>up _ERROR = '<%= pascalEntityName %>up _ERROR'
// ------------------------------------
// Actions
// ------------------------------------

export const <%= pascalEntityName %>Start = () => ({type: <%= pascalEntityName %>up _START})
export const <%= pascalEntityName %>Finish = () => ({type: <%= pascalEntityName %>up _FINISH})
export const <%= pascalEntityName %>Error = (error) => ({type: <%= pascalEntityName %>up _ERROR, payload: error})
// ------------------------------------
// Thunk Actions
// ------------------------------------

export const <%= pascalEntityName %> = () => (dispatch, getState) => {

}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [<%= pascalEntityName %>up _START]: (state) => ({
    ...state,
    loading: true,
    error: { message: '', status: false }
  }),
  [<%= pascalEntityName %>up _FINISH]: (state, action) => ({
    ...state,
    loading: false
  }),
  [<%= pascalEntityName %>up _ERROR]: (state, action) => ({
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

export default function <%= pascalEntityName %>Reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
