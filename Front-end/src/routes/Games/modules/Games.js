import axios from 'axios'
import { apiUrl } from 'globalVar.js'
import errorHandler from 'utils/errorHandler'
// ------------------------------------
// Constants
// ------------------------------------

export const GAME_START = 'GAME_START'
export const GAME_FINISH = 'GAME_FINISH'
export const GAME_ERROR = 'GAME_ERROR'
// ------------------------------------
// Actions
// ------------------------------------

export const GameStart = () => ({type: GAME_START})
export const GameFinish = () => ({type: GAME_FINISH})
export const GameError = (error) => ({type: GAME_ERROR, payload: error})
// ------------------------------------
// Thunk Actions
// ------------------------------------

export const games = () => (dispatch, getState) => {
  console.log('game starting')
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GAME_START]: (state) => ({
    ...state,
    loading: true,
    error: { message: '', status: false }
  }),
  [GAME_FINISH]: (state, action) => ({
    ...state,
    loading: false
  }),
  [GAME_ERROR]: (state, action) => ({
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

export default function GamesReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
