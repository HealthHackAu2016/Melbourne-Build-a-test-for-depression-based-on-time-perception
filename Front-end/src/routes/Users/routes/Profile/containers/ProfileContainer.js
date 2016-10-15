import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { pollDelete, profileFetch } from '../modules/Profile'
import SizeMe from 'react-sizeme'
import { red300, green300 } from 'material-ui/styles/colors'
import SnackBarMod from 'components/SnackBarMod'

import Profile from '../components/Profile'

export class ProfileContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.object.isRequired,
    serverError: PropTypes.object.isRequired,
    size: PropTypes.object.isRequired, // from HOC SizeMe
    polls: PropTypes.array.isRequired,
    isOwner: PropTypes.bool.isRequired,
    successMessage: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    routeParams: PropTypes.object // from react-router
  };

  state = {
    open: false,
    color: green300,
    message: '',
    showVoteButtons: false
  };

  componentDidMount() {
    this.props.dispatch(profileFetch(this.props.routeParams.id))
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

  handleActionTouchTap = () => {
    this.setState({ open: false })
  }

  handleRequestClose = (reason) => {
    if (reason === 'clickaway') {
      this.setState({ open: false })
    }
    this.setState({ open: false })
  }

  onPollDelete = (e) => {
    const { dispatch, routeParams } = this.props
    dispatch(pollDelete(routeParams.id, e.currentTarget.value))
  }

  render() {
    const {polls, size: {width}, loading, isOwner, firstName, lastName} = this.props
    return <div>
      <Profile
        firstName={firstName}
        lastName={lastName}
        polls={polls}
        width={width}
        loading={loading}
        onPollDelete={this.onPollDelete}
        isOwner={isOwner}
      />
      <SnackBarMod
        open={this.state.open}
        message={this.state.message}
        action='Dismiss'
        onActionTouchTap={this.handleActionTouchTap}
        onRequestClose={this.handleRequestClose}
        bodyStyle={{backgroundColor: this.state.color}}
      />
    </div>
  }
}

const mapStateToProps = (state) => ({
  loading: state.Profile.loading,
  serverError: state.Profile.error,
  polls: state.Profile.polls,
  isOwner: state.Profile.isOwner,
  successMessage: state.Profile.successMessage,
  firstName: state.Profile.firstName,
  lastName: state.Profile.lastName
})

export default connect(mapStateToProps)(SizeMe({refreshRate: 300})(ProfileContainer))
