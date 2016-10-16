import React, { PropTypes } from 'react'
import sty from './ResetPassword.scss'
import Card from 'material-ui/Card/Card'
import CardActions from 'material-ui/Card/CardActions'
import CardHeader from 'material-ui/Card/CardHeader'
import CardText from 'material-ui/Card/CardText'
import Textfield from 'material-ui/TextField'
import { grey400 } from 'material-ui/styles/colors'
import { small } from 'utils/windowsize.js'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import AuthButton from 'components/AuthButton'

export default function ResetPassword ({handleSubmit, password, passwordConfirm, loading, resetPassword, width}) {
  return (
    <form className={sty.container} onSubmit={handleSubmit}>
      <Card>
        <CardHeader
          title='Reset Password'
          style={{backgroundColor: grey400}}
          titleStyle={{marginLeft: '16px', fontSize: '18px'}}
          textStyle={{fontWeight: '400'}}
        />
        <CardText expandable={false} className={sty.formText}>
          Use at least 6 characters. Don’t re-use passwords from other websites or include obvious words like your name or email.
        </CardText>
        <CardText expandable={false} className={sty.formBody}>
          <Textfield
            floatingLabelText='Password'
            floatingLabelStyle={{fontWeight: '400'}}
            type='password'
            fullWidth
            errorText={password.touched && password.error && password.error}
            {...password}
          />
          <Textfield
            floatingLabelText='Confirm Password'
            floatingLabelStyle={{fontWeight: '400'}}
            type='password'
            fullWidth
            errorText={passwordConfirm.touched && passwordConfirm.error && passwordConfirm.error}
            {...passwordConfirm}
          />
        </CardText>

        <CardActions className={sty.cardActions}>
          {loading ? <div className={sty.loading}>
            <RefreshIndicator
              size={50}
              left={width < small ? 135 : 221}
              top={0}
              loadingColor={'#FF9800'}
              status='loading'
            />
          </div>
          : <AuthButton
            label='Save Password'
            type='primary'
            childType='input'
          />
        }
        </CardActions>
      </Card>
    </form>
  )
}

ResetPassword.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  resetPassword: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  password: PropTypes.object.isRequired,
  passwordConfirm: PropTypes.object.isRequired
}
