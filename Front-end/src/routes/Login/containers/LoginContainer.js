import React, { Component, PropTypes } from 'react'
import { emailLogin } from '../modules/Login'
import Login from '../components/Login'
import Modal from 'components/Modal'
import isEmail from 'validator/lib/isEmail'
import { reduxForm } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'
import { githubOauthParams, googleOauthParams } from 'globalVar.js'
import qs from 'querystring'

export class LoginContainer extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired, // from redux-form
    fields: PropTypes.object.isRequired, // from redux-form
    emailLogin: PropTypes.func.isRequired, // from login action
    login: PropTypes.object.isRequired, // from login state
    width: PropTypes.number.isRequired // from Size Me HoC
  };

  state = {
    open: false,
    check: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.login.error.status !== this.props.login.error.status) {
      this.setState({open: nextProps.login.error.status})
    }
  }

  handleClose = () => this.setState({open: false})

  handleRememberMe = () => this.setState({check: !this.state.check})

  handleFormSubmit({email, password}) {
    this.props.emailLogin({email, password, rememberMe: this.state.check})
  }

  render() {
    const { handleSubmit, fields: { email, password }, login, width } = this.props
    let githubOauthUrl = `${githubOauthParams.authorizationUrl}?${qs.stringify(githubOauthParams.params)}`
    let googleOauthUrl = `${googleOauthParams.authorizationUrl}?${qs.stringify(googleOauthParams.params)}`
    return (
      <div>
        <Login
          handleSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
          email={email}
          password={password}
          loading={login.loading}
          width={width}
          handleRememberMe={this.handleRememberMe}
          check={this.state.check}
          googleOauthUrl={googleOauthUrl}
          githubOauthUrl={githubOauthUrl}
        />
        <Modal
          title={login.error.status ? 'Login Error' : ''}
          modal={false}
          open={this.state.open}
          handleClose={this.handleClose}
          type='error'
          message={login.error.message}
          actions={<RaisedButton label='Dismiss' primary onTouchTap={this.handleClose} />}
        />
      </div>
    )
  }
}

function validate(formProps) {
  const errors = {}
  if (!formProps.email) {
    errors.email = 'Please enter an email'
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password'
  }

  if (formProps.email && isEmail(formProps.email) === false) {
    errors.email = 'Please enter a valid email'
  }

  return errors
}

const mapStateToProps = (state) => ({ login: state.Login })

export default reduxForm({
  form: 'emailLogin',
  fields: ['email', 'password'],
  validate
}, mapStateToProps, {emailLogin})(LoginContainer)
