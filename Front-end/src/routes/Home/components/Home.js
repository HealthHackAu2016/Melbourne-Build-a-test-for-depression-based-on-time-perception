import React, { PropTypes } from 'react'
import {Card, CardTitle, CardText, CardActions} from 'material-ui/Card'
import { small } from 'utils/windowsize.js'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import {List, ListItem} from 'material-ui/List'
import {blue50, darkBlack} from 'material-ui/styles/colors'
import moment from 'moment'
import {Link} from 'react-router'
import sty from './Home.scss'
import { truncateWithEllipses } from 'utils/general'
import AppIcon from 'material-ui/svg-icons/device/graphic-eq'
import RaisedButton from 'material-ui/RaisedButton'

export const Home = ({width, loading, onGameStart}) => {
  return <div className={sty.container}>
    <Card className={sty.card}>
      <CardTitle
        className={sty.question}
        title='Welcome to time perception training'
      />
      <CardText>
        Welcome to Tau - the time perception training game. Think you can keep time? Well, let’s find out how accurate you are. Better time perception has been linked to better mental health and so with practice you can not only improve how well you keep time, but also change your brain in unexpected ways.
      </CardText>
      <CardText>Practise once a day or as often as you like until you reach your timing potential. Don’t worry if you don’t make much progress to start with. It takes time to change your brain. The longer you do it, the better you will get.
      </CardText>
      <CardActions className={sty.makePollButton}>
        <RaisedButton
          label="Let's start"
          primary
          onTouchTap={onGameStart}
        />
      </CardActions>
    </Card>
  </div>
}

Home.propTypes = {
  width: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  onGameStart: PropTypes.func.isRequired
}

export default Home
