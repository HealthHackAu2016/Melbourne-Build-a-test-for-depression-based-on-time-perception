import React, { PropTypes } from 'react'
import sty from './IntervalIntroPage.scss'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton'

export const IntervalIntroPage = ({instruction, onGameStart}) => (
  <div className={sty.container}>
    <Card className={sty.card}>
      <CardHeader title='Level 1' />
      <CardTitle title="Open interval" />
      <CardText>
        {instruction}
      </CardText>
      <CardActions>
        <RaisedButton label="Let's start!" primary onTouchTap={onGameStart} />
      </CardActions>
    </Card>
  </div>
)

IntervalIntroPage.propTypes = {
  instruction: PropTypes.string,
  onGameStart: PropTypes.func.isRequired
}

export default IntervalIntroPage
