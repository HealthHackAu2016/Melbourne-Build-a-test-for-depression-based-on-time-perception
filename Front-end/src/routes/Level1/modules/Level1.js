import axios from 'axios'
import { apiUrl } from 'globalVar.js'
import errorHandler from 'utils/errorHandler'
import moment from 'moment'
// ------------------------------------
// Constants
// ------------------------------------

export const LEVEL1_START = 'LEVEL1_START'
export const LEVEL1_FINISH = 'LEVEL1_FINISH'
export const LEVEL1_ERROR = 'LEVEL1_ERROR'
export const INTERVAL_START = 'INTERVAL_START'
export const INTERVAL_STOP = 'INTERVAL_STOP'
export const SET_TIME_DIFFERENCE = 'SET_TIME_DIFFERENCE'

// ------------------------------------
// Actions
// ------------------------------------

export const Level1Start = () => ({type: LEVEL1_START})
export const IntervalStart = (time) => ({type: INTERVAL_START, payload: time})
export const IntervalStop = (stopTime, currentInterval, result) => (
  {type: INTERVAL_STOP,
    payload: {
      stopTime: stopTime,
      currentInterval: currentInterval,
      result: result
    }
  }
)
export const Level1Finish = () => ({type: LEVEL1_FINISH})
export const Level1Error = (error) => ({type: LEVEL1_ERROR, payload: error})
export const SetTimeDifference= (time) => ({type: SET_TIME_DIFFERENCE, payload: time})

// ------------------------------------
// Thunk Actions
// ------------------------------------

export const level1 = () => (dispatch, getState) => {
  dispatch(Level1Start())
  console.log('level 1 start')
}

export const onIntervalStart = () => (dispatch, getState) => {
  const {currentInterval, intervals } = getState().Level1
  const interval = intervals[currentInterval]
  const time = moment()

  dispatch(IntervalStart(time))
}

export const onIntervalStop = () => (dispatch, getState) => {
  const {currentInterval, intervals, startTime } = getState().Level1
  const interval = intervals[currentInterval]
  const stopTime = moment()
  const result = stopTime.diff(startTime, 'milliseconds') / 1000

  dispatch(IntervalStop(stopTime, currentInterval, result))
  dispatch(SetTimeDifference())

  console.log('interval stop')
}


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LEVEL1_START]: (state) => ({
    ...state,
    gameStarted: true,
    currentInterval: state.currentInterval + 1,
    error: { message: '', status: false }
  }),
  [LEVEL1_FINISH]: (state, action) => ({
    ...state,
    gameStarted: false
  }),
  [INTERVAL_START]: (state, action) => ({
    ...state,
    intervalStarted: true,
    startTime: action.payload
  })
  }

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  instruction: 'asfsadf sadfas fasdf asdf asdf asd fasd fasd fas df asd fas df asd fas   dasfasdfasdfas dsafasdfasdf',
  gameStarted: false,
  intervalStarted: false,
  currentInterval: -1,
  startTime: 0,
  stopTime: 0,
  intervals: [
    {
      level: 1,
      instruction: 'Press START, COUNT to the number of seconds shown, and press STOP',
      result: 0,
      time: 3
    },
    {
      level: 2,
      instruction: 'yolo fasdf asdfewafsdf asdfasdfa weafasdfasasdfa asdfasf',
      result: 0,
      time: 4
    },
    {
      level: 3,
      result: 0,
      instruction: 'yolo fasdf asdfewafsdf asdfasdfa weafasdfasasdfa asdfasf',
      time: 5
    },
    {
      level: 4,
      instruction: 'yolo fasdf asdfewafsdf asdfasdfa weafasdfasasdfa asdfasf',
      result: 0,
      time: 5
    },
    {
      level: 5,
      instruction: 'yolo fasdf asdfewafsdf asdfasdfa weafasdfasasdfa asdfasf',
      result: 0,
      time: 5
    }
  ],
  error: {
    message: '',
    status: false
  }
}

export default function Level1Reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
