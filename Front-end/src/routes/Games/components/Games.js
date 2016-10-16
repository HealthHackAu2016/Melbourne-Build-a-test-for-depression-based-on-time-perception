import React, { PropTypes } from 'react'
import sty from './Games.scss'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton'
import {Link} from 'react-router'

export const Games = () => (
  <div className={sty.container}>
    <Card className={sty.card}>
      <CardHeader
        title='Level 1'
        subtitle='Open intervals'
      />
      <CardActions>
        <Link to='/level1'>
          <RaisedButton label='Play' primary />
        </Link>
      </CardActions>
    </Card>

    <Card className={sty.card}>
      <CardHeader
        title='Level 2'
        subtitle='Simultaneous interval'
      />
      <CardActions>
        <Link to='/level2'>
          <RaisedButton label='Play' primary />
        </Link>
      </CardActions>
    </Card>

    <Card className={sty.card}>
      <CardHeader
        title='Level 3'
        subtitle='Interval with distractions'
      />
      <CardActions>
        <Link to='/level3'>
          <RaisedButton label='Play' primary />
        </Link>
      </CardActions>
    </Card>

  </div>
)

Games.propTypes = {
  // : PropTypes.
}

export default Games
