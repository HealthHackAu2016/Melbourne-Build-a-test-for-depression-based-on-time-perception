import React, { PropTypes } from 'react'
import sty from './Level1.scss'

export const Level1 = () => (
  <div className={sty.container}>
    <h4>yolo</h4>
  </div>
)

Level1.propTypes = {
  interval: PropTypes.interval.number.isRequired
}

export default Level1
