import React, { PropTypes } from 'react'
import Card from 'material-ui/Card/Card'
import CardActions from 'material-ui/Card/CardActions'
import CardHeader from 'material-ui/Card/CardHeader'
import CardText from 'material-ui/Card/CardText'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import RaisedButton from 'material-ui/RaisedButton'
import { grey400 } from 'material-ui/styles/colors'
import sty from './UserSettings.scss'

export const UserSettings = ({handleDelete, loading, width}) => (
  <div className={sty.container}>
    <Card>
      <CardHeader
        title='Delete Account'
        style={{backgroundColor: grey400}}
        titleStyle={{marginLeft: '16px', fontSize: '18px'}}
        textStyle={{fontWeight: '400'}}
      />
      <CardText expandable={false} className={sty.formText}>
        You can delete your account, but keep in mind this action is irreversible.
      </CardText>

      <CardActions className={sty.cardActions}>
        {loading ? <div className={sty.loading}>
          <RefreshIndicator
            size={50}
            left={width <= 493 ? 135 : 221}
            top={0}
            loadingColor={'#FF9800'}
            status='loading'
          />
        </div>
        : <RaisedButton
          label='Delete'
          secondary
          labelPosition='before'
          onClick={handleDelete}
        />
      }
      </CardActions>
    </Card>
  </div>
)

UserSettings.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  width: PropTypes.number.isRequired
}

export default UserSettings
