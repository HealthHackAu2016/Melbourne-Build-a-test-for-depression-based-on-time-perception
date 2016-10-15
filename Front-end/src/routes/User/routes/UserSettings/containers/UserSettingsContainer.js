import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import UserSettings from '../components/UserSettings'
import { accountDelete } from '../modules/UserSettings'
import SizeMe from 'react-sizeme'
// import { push } from 'react-router-redux'
import Modal from 'components/Modal'
import RaisedButton from 'material-ui/RaisedButton'
import { logOut } from 'redux/session'

export class UserSettingsContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    serverError: PropTypes.object, // from auth reducer
    loading: PropTypes.bool.isRequired, // from auth reducer
    successMessage: PropTypes.string,
    size: PropTypes.object.isRequired // from HOC SizeMe
  }

  state = { open: false };

  componentWillReceiveProps(nextProps) {
    if (nextProps.serverError.status !== this.props.serverError.status) {
      this.setState({open: nextProps.serverError.status})
    }
    if (nextProps.successMessage !== this.props.successMessage) {
      this.setState({open: true})
    }
  }

  onAccountDelete = () => this.props.dispatch(accountDelete())

  handleClose = () => {
    this.setState({open: false})
    if (this.props.successMessage !== '') { this.props.dispatch(logOut()) }
  }

  render() {
    const { serverError, successMessage, loading, size: {width} } = this.props
    return <div>
      <UserSettings
        handleDelete={this.onAccountDelete}
        loading={loading}
        width={width}
      />
      <Modal
        title={serverError.status ? 'Setting Update Error' : 'Setting Update Success'}
        modal={false}
        type={serverError.status ? 'error' : ''}
        open={this.state.open}
        handleClose={this.handleClose}
        message={successMessage !== '' ? successMessage : serverError.message}
        actions={<RaisedButton label='Dismiss' primary onTouchTap={this.handleClose} />}
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

