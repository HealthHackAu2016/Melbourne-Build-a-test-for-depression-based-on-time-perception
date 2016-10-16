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
        title='Heading'
      />
      <CardText>
       Nullam eu ante vel est convallis dignissim.  Fusce suscipit, wisi nec facilisis facilisis, est dui fermentum leo, quis tempor ligula erat quis odio.  Nunc porta vulputate tellus.  Nunc rutrum turpis sed pede.  Sed bibendum.  Aliquam posuere.  Nunc aliquet, augue nec adipiscing interdum, lacus tellus malesuada massa, quis varius mi purus non odio.  Pellentesque condimentum, magna ut suscipit hendrerit, ipsum augue ornare nulla, non luctus diam neque sit amet urna.  Curabitur vulputate vestibulum lorem.  Fusce sagittis, libero non molestie mollis, magna orci ultrices dolor, at vulputate neque nulla lacinia eros.  Sed id ligula quis est convallis tempor.  Curabitur lacinia pulvinar nibh.  Nam a sapien.
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
