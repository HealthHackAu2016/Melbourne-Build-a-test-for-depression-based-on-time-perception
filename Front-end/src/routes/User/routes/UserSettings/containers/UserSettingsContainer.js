import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import UserSettings from '../components/UserSettings'
import { accountDelete } from '../modules/UserSettings'
import SizeMe from 'react-sizeme'
import Modal from 'components/Modal'
import RaisedButton from 'material-ui/RaisedButton'
import { logOut } from 'redux/session'
import FlatButton from 'material-ui/FlatButton'

export class UserSettingsContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    serverError: PropTypes.object, // from auth reducer
    loading: PropTypes.bool.isRequired, // from auth reducer
    successMessage: PropTypes.string,
    size: PropTypes.object.isRequired // from HOC SizeMe
  }

  state = { open: false, message: '', title: '' };

  componentWillReceiveProps(nextProps) {
    if (nextProps.serverError.status !== this.props.serverError.status) {
      this.setState({
        open: nextProps.serverError.status,
        message: nextProps.serverError.message,
        title: 'Server Error'
      })
    }
    if (nextProps.successMessage !== this.props.successMessage) {
      this.setState({open: true, message: nextProps.successMessage, title: 'Acccount Deleted'})
    }
  }

  onAccountDelete = () => {
    this.setState({open: false, message: ''})
    this.props.dispatch(accountDelete())
  }

  handleClose = () => {
    this.setState({open: false, message: '', title: ''})
    if (this.state.message.includes('deleted')) { this.props.dispatch(logOut()) }
  }

  handleDelete = () => {
    this.setState({
      message: 'Please confirm if you want to permanently delete your account and all of your polls.',
      open: true,
      title: 'Delete Confirmation'
    })
  }

  render() {
    const { serverError, successMessage, loading, size: {width} } = this.props
    console.log(successMessage)
    const deleteActions = [
      <FlatButton
        label='Dismiss' primary onTouchTap={this.handleClose}
      />,
      <RaisedButton
        label='Confirm Delete' secondary onTouchTap={this.onAccountDelete}
      />
    ]
    const action = <RaisedButton label='Dismiss' primary onTouchTap={this.handleClose} />

    const actionOrDelete = () => {
      if (!this.state.message.includes('deleted')) return deleteActions
      return action
    }
    return <div>
      <UserSettings
        handleDelete={this.handleDelete}
        loading={loading}
        width={width}
      />
      <Modal
        title={this.state.title}
        modal={false}
        type={serverError.status ? 'error' : ''}
        open={this.state.open}
        handleClose={this.handleClose}
        message={this.state.message}
        actions={actionOrDelete()}
      />
    </div>
  }
}

const mapStateToProps = (state) => ({
  serverError: state.UserSettings.error,
  loading: state.UserSettings.loading,
  successMessage: state.UserSettings.successMessage
})

export default connect(mapStateToProps)(SizeMe({refreshRate: 300})(UserSettingsContainer))

