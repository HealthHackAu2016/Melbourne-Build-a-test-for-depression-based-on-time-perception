import React, { Component, PropTypes } from 'react'
import { resetPassword } from '../modules/ResetPassword'
import ResetPasswordForm from '../components/ResetPassword'
import Modal from 'components/Modal'
import RaisedButton from 'material-ui/RaisedButton'
import { reduxForm } from 'redux-form'
import { push } from 'react-router-redux'

export class ResetPasswordContainer extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired, // from redux-form
    fields: PropTypes.object.isRequired, // from redux-form
    resetPassword: PropTypes.func.isRequired, // from ResetPassword action
    rp: PropTypes.object.isRequired, // from ResetPassword state
    width: PropTypes.number.isRequired, // from Size Me HoC
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired // from react-router
  };

  state = { open: false };

  componentWillReceiveProps(nextProps) {
    if (nextProps.rp.error.status !== this.props.rp.error.status) {
      this.setState({open: nextProps.rp.error.status})
    }
    if (nextProps.rp.successMessage !== this.props.rp.successMessage) {
      this.setState({open: true})
    }
  }

  handleClose = () => {
    this.setState({open: false})
    // if no error and password reset was successful then redirect to signin page
    if (!this.props.rp.error.status) {
      this.props.dispatch(push('/login'))
    }
  }

  handleFormSubmit({password}) {
    this.props.resetPassword({password, token: this.props.params.token})
  }

  render() {
    const { handleSubmit, fields: { password, passwordConfirm }, rp, resetPassword, width } = this.props
    return (
      <div>
        <ResetPasswordForm
          handleSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
          password={password}
          passwordConfirm={passwordConfirm}
          loading={rp.loading}
          resetPassword={resetPassword}
          width={width}
        />
        <Modal
          title={rp.error.status ? 'Forgot Password Error' : 'Password Reset Success'}
          modal={false}
          type={rp.error.status ? 'error' : ''}
          open={this.state.open}
          handleClose={this.handleClose}
          message={rp.successMessage !== '' ? rp.successMessage : rp.error.message}
          actions={<RaisedButton label='Dismiss' primary onTouchTap={this.handleClose} />}
        />
      </div>
    )
  }
}


function validate(formProps) {
  const errors = {}
  if (!formProps.password) {
    errors.password = 'Please enter a password'
  }

  if (formProps.password && formProps.password.length < 6) {
    errors.password = 'Your password must be at least 6 characters'
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a matching password'
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a matching password'
  }

  return errors
}

const mapActionCreators = {
  resetPassword
}

const mapStateToProps = (state) => ({
  rp: state.ResetPassword
})

export default reduxForm({
  form: 'resetPassword',
  fields: ['password', 'passwordConfirm'],
  validate
}, mapStateToProps, mapActionCreators)(ResetPasswordContainer)
