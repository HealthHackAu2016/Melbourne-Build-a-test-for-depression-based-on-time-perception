import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { passwordChange } from '../modules/Security'
import Snackbar from 'material-ui/Snackbar'
import UserSecurityEditForm from '../components/Security'
import { red300, green300 } from 'material-ui/styles/colors'
import SizeMe from 'react-sizeme'

export class UserSecurityContainer extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired, // from redux-form
    fields: PropTypes.object.isRequired, // from redux-form
    passwordChange: PropTypes.func.isRequired, // from authenticate action
    serverError: PropTypes.object, // from auth reducer
    loading: PropTypes.bool.isRequired, // from auth reducer
    successMessage: PropTypes.string,
    size: PropTypes.object.isRequired // from HOC SizeMe
  };

  state = {
    open: false,
    autoHideDuration: 4000,
    message: '',
    color: green300
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.serverError.status !== this.props.serverError.status) {
      this.setState({open: nextProps.serverError.status, color: red300, message: nextProps.serverError.message})
    }
    if (nextProps.successMessage !== this.props.successMessage) {
      this.setState({open: true, color: green300, message: nextProps.successMessage})
    }
  }

  handleTouchTap = () => this.setState({ open: true })

  handleActionTouchTap = () => this.setState({ open: false })

  handleRequestClose = () => this.setState({ open: false })

  handleFormSubmit({password}) {
    this.props.passwordChange({
      password
    })
  }

  render() {
    const { fields: { password, confirmPassword }, handleSubmit, loading, size: {width} } = this.props
    return <div>
      <UserSecurityEditForm
        handleSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        password={password}
        confirmPassword={confirmPassword}
        width={width}
        loading={loading}
      />
      <Snackbar
        open={this.state.open}
        message={this.state.message}
        autoHideDuration={this.state.autoHideDuration}
        onActionTouchTap={this.handleActionTouchTap}
        onRequestClose={this.handleRequestClose}
        bodyStyle={{backgroundColor: this.state.color}}
      />
    </div>
  }
}

function validate(formProps) {
  const errors = {}
  if (!formProps.password) {
    errors.password = 'Please enter an password'
  }

  if (formProps.password && formProps.password.length < 7) {
    errors.password = 'Your password must be at least 8 characters'
  }

  if (!formProps.confirmPassword) {
    errors.confirmPassword = 'Please enter a matching password'
  }

  if (formProps.password !== formProps.confirmPassword) {
    errors.confirmPassword = 'Please enter a matching password'
  }

  return errors
}

const mapStateToProps = (state) => ({
  serverError: state.Security.error,
  loading: state.Security.loading,
  successMessage: state.Security.successMessage
})

export default reduxForm({
  form: 'passwordChange',
  fields: ['password', 'confirmPassword'],
  validate
}, mapStateToProps, {passwordChange})(SizeMe({refreshRate: 300})(UserSecurityContainer))
