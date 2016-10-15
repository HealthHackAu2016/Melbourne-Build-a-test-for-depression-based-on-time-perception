import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { userProfileUpdate, getUserProfile } from '../modules/ProfileEdit'
import isEmail from 'validator/lib/isEmail'
import Snackbar from 'material-ui/Snackbar'
import ProfileEditForm from '../components/ProfileEdit'
import { red300, green300 } from 'material-ui/styles/colors'
import SizeMe from 'react-sizeme'

export class ProfileEditContainer extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired, // from redux-form
    fields: PropTypes.object.isRequired, // from redux-form
    userProfileUpdate: PropTypes.func.isRequired, // from authenticate action
    getUserProfile: PropTypes.func.isRequired, // from authenticate action
    serverError: PropTypes.object, // from auth reducer
    loading: PropTypes.bool.isRequired, // from auth reducer
    successMessage: PropTypes.string,
    initialValues: PropTypes.object,
    size: PropTypes.object.isRequired // from HOC SizeMe
  };

  state = {
    open: false,
    autoHideDuration: 4000,
    message: '',
    color: green300
  }

  componentWillMount() {
    this.props.getUserProfile()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.serverError.status !== this.props.serverError.status) {
      this.setState({open: nextProps.serverError.status, color: red300, message: nextProps.serverError.message})
    }
    if (nextProps.successMessage !== this.props.successMessage) {
      this.setState({open: true, color: green300, message: nextProps.successMessage})
    }
  }

  handleTouchTap = () => {
    this.setState({
      open: true
    })
  }

  handleActionTouchTap = () => {
    this.setState({
      open: false
    })
  }

  handleRequestClose = () => {
    this.setState({
      open: false
    })
  }

  handleFormSubmit({firstName, lastName, email, gender, location, website}) {
    this.props.userProfileUpdate({
      firstName, lastName, email, gender, location, website
    })
  }

  render() {
    const { fields: { firstName, lastName, email, gender, location, website }, handleSubmit, loading, size: {width} } = this.props
    return <div>
      <ProfileEditForm
        handleSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        firstName={firstName}
        lastName={lastName}
        email={email}
        gender={gender}
        location={location}
        website={website}
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
  if (!formProps.email) { errors.email = 'Please enter an email' }

  if (formProps.email && isEmail(formProps.email) === false) {
    errors.email = 'Please enter a valid email'
  }

  return errors
}

const mapStateToProps = (state) => ({
  serverError: state.ProfileEdit.error,
  loading: state.ProfileEdit.loading,
  successMessage: state.ProfileEdit.successMessage,
  // lesson you can preload the form with by passing 'initialValues' key and git it an object with data of the fields in the form
  initialValues: state.ProfileEdit.userProfile
})

export default reduxForm({
  form: 'userProfileUpdate',
  fields: [
    'firstName',
    'lastName',
    'email',
    'gender',
    'location',
    'website'
  ],
  validate
}, mapStateToProps, {userProfileUpdate, getUserProfile})(SizeMe({refreshRate: 300})(ProfileEditContainer))
