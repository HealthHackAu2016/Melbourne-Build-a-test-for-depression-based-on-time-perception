import React, { PropTypes } from 'react'
import sty from './Interval1.scss'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton'
import Timer from './Timer.js'

const renderButton = (intervalStarted, onIntervalStart, onIntervalStop) => {
  if (intervalStarted) {
    return <RaisedButton label="Stop" secondary onTouchTap={onIntervalStop} />
  } else {
    return <RaisedButton label="Start" primary onTouchTap={onIntervalStart} />
  }
}

export const Interval1 = ({instruction, time, intervalStarted, onIntervalStart, onIntervalStop}) => (
  <div className={sty.container}>
    <Card className={sty.card}>
      <CardHeader title='Level 1' />
      <CardTitle title="Interval 1" />
      <CardText>
        {instruction}
      </CardText>
      <Timer time={time} />
      <CardActions>
        {renderButton(intervalStarted, onIntervalStart, onIntervalStop)}
      </CardActions>
    </Card>
  </div>
)

Interval1.propTypes = {
  instruction: PropTypes.string,
  onIntervalStart: PropTypes.func.isRequired,
  onIntervalStop: PropTypes.func.isRequired,
  intervalStarted: PropTypes.bool.isRequired,
  time: PropTypes.number.isRequired
}

export default Interval1
