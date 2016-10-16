import React, { Component, PropTypes } from 'react'
import { forgotPassword } from '../modules/ForgotPassword'
import ForgotPasswordForm from '../components/ForgotPassword'
import Modal from 'components/Modal'
import isEmail from 'validator/lib/isEmail'
import { reduxForm } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'
import { push } from 'react-router-redux'

export class ForgotPasswordContainer extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired, // from redux-form
    fields: PropTypes.object.isRequired, // from redux-form
    forgotPassword: PropTypes.func.isRequired, // from ForgotPassword action
    ForgotPassword: PropTypes.object.isRequired, // from ForgotPassword state
    width: PropTypes.number.isRequired, // from Size Me HoC
    dispatch: PropTypes.func.isRequired
  };

  state = {
    open: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.ForgotPassword.error.status !== this.props.ForgotPassword.error.status) {
      this.setState({open: nextProps.ForgotPassword.error.status})
    }
    if (nextProps.ForgotPassword.successMessage !== this.props.ForgotPassword.successMessage) {
      this.setState({open: true})
    }
  }

  handleClose = () => {
    this.setState({open: false})
    // if no error and email reset was successful then redirect to signin page
    if (!this.props.ForgotPassword.error.status) {
      this.props.dispatch(push('/login'))
    }
  }

  handleFormSubmit({email}) {
    this.props.forgotPassword({email})
  }

  render() {
    const { handleSubmit, fields: { email }, ForgotPassword, forgotPassword, width } = this.props
    return (
      <div>
        <ForgotPasswordForm
          handleSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
          email={email}
          loading={ForgotPassword.loading}
          forgotPassword={forgotPassword}
          width={width}
        />
        <Modal
          title={ForgotPassword.error.status ? 'Forgot Password Error' : 'Password Reset Success'}
          modal={false}
          type={ForgotPassword.error.status ? 'error' : ''}
          open={this.state.open}
          handleClose={this.handleClose}
          message={ForgotPassword.successMessage !== '' ? ForgotPassword.successMessage : ForgotPassword.error.message}
          actions={<RaisedButton label='Dismiss' primary onTouchTap={this.handleClose} />}
        />
      </div>
    )
  }
}

const mapActionCreators = {
  forgotPassword
}

function validate(formProps) {
  const errors = {}
  if (!formProps.email) {
    errors.email = 'Please enter an email'
  }

  if (formProps.email && isEmail(formProps.email) === false) {
    errors.email = 'Please enter a valid email'
  }

  return errors
}

const mapStateToProps = (state) => ({
  ForgotPassword: state.ForgotPassword
})

export default reduxForm({
  form: 'forgotPassword',
  fields: ['email'],
  validate
}, mapStateToProps, mapActionCreators)(ForgotPasswordContainer)
