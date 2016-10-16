import React, { PropTypes } from 'react'
import sty from './Timer.scss'

export const Timer = ({time}) => (
  <div className={sty.container}>
    <h2>{time}</h2>
    <h4>Seconds</h4>
  </div>
)

Timer.propTypes = {
  time: PropTypes.number.isRequired
}

export default Timer
