import React, { PropTypes } from 'react'
import sty from './ForgotPassword.scss'
import Card from 'material-ui/Card/Card'
import CardActions from 'material-ui/Card/CardActions'
import CardHeader from 'material-ui/Card/CardHeader'
import CardText from 'material-ui/Card/CardText'
import Textfield from 'material-ui/TextField'
import { grey400 } from 'material-ui/styles/colors'
import { small } from 'utils/windowsize.js'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import AuthButton from 'components/AuthButton'

export default function ForgotPassword ({handleSubmit, email, loading, forgotPassword, width}) {
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
          Enter the email address associated with your account, and we’ll email you a link to reset your password.
        </CardText>
        <CardText expandable={false} className={sty.formBody}>
          <Textfield
            floatingLabelText='Email'
            floatingLabelStyle={{fontWeight: '400'}}
            fullWidth
            errorText={email.touched && email.error && email.error}
            {...email}
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
            label='Send Reset Link'
            type='primary'
            childType='input'
          />
        }
        </CardActions>
      </Card>
    </form>
  )
}

ForgotPassword.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  forgotPassword: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  email: PropTypes.object.isRequired
}
