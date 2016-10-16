import React, { Component, PropTypes } from 'react'
import { emailSignup } from '../modules/Signup'
import Signup from '../components/Signup'
import Modal from 'components/Modal'
import isEmail from 'validator/lib/isEmail'
import { reduxForm } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'
import { githubOauthParams, googleOauthParams } from 'globalVar.js'
import qs from 'querystring'

export class SignupContainer extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired, // from redux-form
    fields: PropTypes.object.isRequired, // from redux-form
    emailSignup: PropTypes.func.isRequired, // from signup action
    signup: PropTypes.object.isRequired, // from signup reducer state
    width: PropTypes.number.isRequired // from Size Me HoC
  };

  state = {
    open: false,
    formExpand: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.signup.error.status !== this.props.signup.error.status) {
      this.setState({open: nextProps.signup.error.status})
    }
  }

  handleClose = () => this.setState({open: false})

  handleExpand = () => this.setState({formExpand: true})

  handleRememberMe = () => this.setState({check: !this.state.check})

  handleFormSubmit({firstName, lastName, email, password}) {
    this.props.emailSignup({firstName, lastName, email, password})
  }

  render() {
    const { handleSubmit, fields: { firstName, lastName, email, password }, signup, emailSignup, width } = this.props
    let githubOauthUrl = `${githubOauthParams.authorizationUrl}?${qs.stringify(githubOauthParams.params)}`
    let googleOauthUrl = `${googleOauthParams.authorizationUrl}?${qs.stringify(googleOauthParams.params)}`
    return (
      <div>
        <Signup
          handleSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
          firstName={firstName}
          lastName={lastName}
          email={email}
          password={password}
          loading={signup.loading}
          emailSignup={emailSignup}
          width={width}
          handleExpand={this.handleExpand}
          formExpand={this.state.formExpand}
          googleOauthUrl={googleOauthUrl}
          githubOauthUrl={githubOauthUrl}
        />
        <Modal
          title={signup.error.status ? 'Signup Error' : ''}
          modal={false}
          open={this.state.open}
          handleClose={this.handleClose}
          type='error'
          message={signup.error.message}
          actions={<RaisedButton label='Dismiss' primary onTouchTap={this.handleClose} />}
        />
      </div>
    )
  }
}

const mapActionCreators = {
  emailSignup
}

function validate(formProps) {
  const errors = {}
  if (!formProps.firstName) {
    errors.firstName = 'Please enter your first name'
  }

  if (!formProps.lastName) {
    errors.lastName = 'Please enter your last name'
  }

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

const mapStateToProps = (state) => ({
  signup: state.Signup
})

export default reduxForm({
  form: 'Signup',
  fields: ['firstName', 'lastName', 'email', 'password'],
  validate
}, mapStateToProps, mapActionCreators)(SignupContainer)
