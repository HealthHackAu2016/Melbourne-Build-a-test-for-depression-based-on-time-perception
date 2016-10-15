import React, { PropTypes } from 'react'
import Card from 'material-ui/Card/Card'
import CardActions from 'material-ui/Card/CardActions'
import CardHeader from 'material-ui/Card/CardHeader'
import CardText from 'material-ui/Card/CardText'
import Textfield from 'material-ui/TextField'
import {grey400} from 'material-ui/styles/colors'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import RaisedButton from 'material-ui/RaisedButton'
import { small } from 'utils/windowsize.js'
import sty from './Security.scss'

export const Security = ({ handleSubmit, password, confirmPassword, width, loading }) => (
  <form
    className={sty.container}
    onSubmit={handleSubmit}
  >
    <Card>
      <CardHeader
        title='Change Your Password'
        style={{backgroundColor: grey400}}
        titleStyle={{marginLeft: '16px', fontSize: '18px'}}
        textStyle={{fontWeight: '400'}}
      />
      <CardText expandable={false} className={sty.formBody}>
        <Textfield
          floatingLabelText='Password'
          floatingLabelStyle={{fontWeight: '400'}}
          type='password'
          fullWidth
          errorText={password.touched ? password.error : ''}
          {...password}
        />
        <Textfield
          floatingLabelText='Confirm Password'
          floatingLabelStyle={{fontWeight: '400'}}
          type='password'
          fullWidth
          errorText={confirmPassword.touched ? confirmPassword.error : ''}
          {...confirmPassword}
        />
      </CardText>
      <CardActions className={sty.cardActions}>
        {loading ? <div className={sty.loading}>
          <RefreshIndicator
            size={50}
            left={width === small ? 135 : 221}
            top={0}
            loadingColor={'#FF9800'}
            status='loading'
          />
        </div>
        : <RaisedButton
          label='Save'
          primary
          labelPosition='before'
        >
          <input type='submit' className={sty.input} />
        </RaisedButton>
        }
      </CardActions>
    </Card>
  </form>
)

Security.propTypes = {
  handleSubmit: PropTypes.func.isRequired, // from redux-form
  loading: PropTypes.bool.isRequired, // from auth reducer
  width: PropTypes.number.isRequired, // from HOC DetectWidth,
  password: PropTypes.object.isRequired,
  confirmPassword: PropTypes.object.isRequired
}

export default Security
