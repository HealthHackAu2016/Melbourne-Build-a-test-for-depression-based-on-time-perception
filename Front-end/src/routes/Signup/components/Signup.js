import React, { PropTypes } from 'react'
import Card from 'material-ui/Card/Card'
import CardActions from 'material-ui/Card/CardActions'
import CardText from 'material-ui/Card/CardText'
import Textfield from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import {grey100, grey300} from 'material-ui/styles/colors'
import {Link} from 'react-router'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import { small } from 'utils/windowsize.js'
import sty from './Signup.scss'
import AuthButton from 'components/AuthButton'

export default function Signup ({
  handleSubmit, firstName, lastName, email, password, loading, emailSignup, width, handleExpand, formExpand, googleOauthUrl, githubOauthUrl
}) {
  const oAuthTextLinks = <div>
    Sign up with <a href={googleOauthUrl}>Google</a> or <a href={githubOauthUrl}>Github</a>
  </div>
  const oAuthButtons = [
    <AuthButton
      label='Signup with Google'
      childType='link'
      link={googleOauthUrl}
      backgroundColor={grey100}
      key={1}
    />,
    <AuthButton
      label='Signup with github'
      childType='link'
      link={githubOauthUrl}
      backgroundColor={grey300}
      key={2}
    />
  ]

  const localAuthButton = <AuthButton
    label='Sign up with Email'
    type='primary'
    childType='none'
    handleClick={handleExpand}
  />

  const signUpOrLoader = () => {
    if (loading) {
      return <div className={sty.loading}>
        <RefreshIndicator
          size={50}
          left={width < small ? 135 : 221}
          top={0}
          loadingColor={'#FF9800'}
          status='loading'
        />
      </div>
    } else if (!formExpand) {
      return
    } else {
      return <AuthButton
        label='Sign up'
        type='primary'
        childType='input'
      />
    }
  }

  return (
    <form
      className={sty.container}
      onSubmit={handleSubmit}
    >
      <Card className={sty.card} expanded={formExpand} >
        <div className={sty.thirdPartySignin}>
          {formExpand ? oAuthTextLinks : oAuthButtons}
          <div className={sty.separator}>
            <div className={sty.lineSeparator}><span>or</span></div>
          </div>
          {formExpand ? '' : localAuthButton}
        </div>
        <CardText expandable className={sty.formBody}>
          <Textfield
            floatingLabelText='First Name'
            floatingLabelStyle={{fontWeight: '400'}}
            fullWidth
            errorText={firstName.touched && firstName.error && firstName.error}
            {...firstName}
          />
          <Textfield
            floatingLabelText='Last Name'
            floatingLabelStyle={{fontWeight: '400'}}
            fullWidth
            errorText={lastName.touched && lastName.error && lastName.error}
            {...lastName}
          />
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
        </CardText>

        <CardActions className={sty.cardActions}>
          {signUpOrLoader()}
          <hr style={{marginTop: '2em'}} />
          <div className={sty.signup}>
            <div className={sty.signupText}>Already have an account?</div>
            <Link to='/login'>
              <RaisedButton label='Login' labelPosition='before' backgroundColor={grey300} />
            </Link>
          </div>
        </CardActions>
      </Card>
    </form>
  )
}

Signup.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleExpand: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  emailSignup: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  firstName: PropTypes.object.isRequired,
  lastName: PropTypes.object.isRequired,
  email: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired,
  formExpand: PropTypes.bool.isRequired,
  githubOauthUrl: PropTypes.string.isRequired,
  googleOauthUrl: PropTypes.string.isRequired
}
