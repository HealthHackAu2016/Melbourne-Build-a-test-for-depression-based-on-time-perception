import React, { PropTypes } from 'react'
import Card from 'material-ui/Card/Card'
import CardActions from 'material-ui/Card/CardActions'
import CardText from 'material-ui/Card/CardText'
import Textfield from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import {grey100, grey400, grey300} from 'material-ui/styles/colors'
import Checkbox from 'material-ui/checkbox'
import {Link} from 'react-router'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import { small } from 'utils/windowsize.js'
import sty from './Login.scss'
import AuthButton from 'components/AuthButton'

export default function Login ({
  handleSubmit, email, password, loading, emailLogin, width, check, handleRememberMe, googleOauthUrl, githubOauthUrl
}) {
  return (
    <form
      className={sty.container}
      onSubmit={handleSubmit}
    >
      <Card className={sty.card}>
        <div className={sty.thirdPartySignin}>
          <AuthButton
            label='Log in with Google'
            childType='link'
            link={googleOauthUrl}
            backgroundColor={grey100}
          />
          <AuthButton
            label='Log in with Github'
            backgroundColor={grey300}
            childType='link'
            link={githubOauthUrl}
          />
          <div className={sty.separator}>
            <div className={sty.lineSeparator}><span>or</span></div>
          </div>
        </div>

        <CardText expandable={false} className={sty.formBody}>
          <Textfield
            floatingLabelText='Email'
            floatingLabelStyle={{fontWeight: '400'}}
            fullWidth
            errorText={email.touched && email.error && email.error}
            {...email}
          />
          <Textfield
            floatingLabelText='Password'
            floatingLabelStyle={{fontWeight: '400'}}
            type='password'
            fullWidth
            errorText={password.touched ? password.error : ''}
            {...password}
          />

          <div className={sty.rememberOrForgot}>
            <div className={sty.checkbox}>
              <Checkbox
                label='Remember me'
                labelStyle={{marginLeft: '-14px', width: '100%', color: grey400, fontWeight: '400'}}
                iconStyle={{fill: grey400}}
                onCheck={handleRememberMe}
                checked={check}
              />
            </div>
            <div className={sty.forgot}>
              <Link to='/forgot_password'>Forgot password?</Link>
            </div>
          </div>
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
            label='Log In'
            type='primary'
            childType='input'
          />
        }
          <hr style={{marginTop: '2em'}} />
          <div className={sty.signup}>
            <div className={sty.signupText}>Don't have an account?</div>
            <Link to='/signup'>
              <RaisedButton label='Sign up'labelPosition='before' backgroundColor={grey300} />
            </Link>
          </div>
        </CardActions>
      </Card>
    </form>
  )
}

Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleRememberMe: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  check: PropTypes.bool.isRequired,
  emailLogin: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  email: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired,
  githubOauthUrl: PropTypes.string.isRequired,
  googleOauthUrl: PropTypes.string.isRequired
}
