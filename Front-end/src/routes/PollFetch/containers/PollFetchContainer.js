import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { pollFetch, pollVote, resetError } from '../modules/PollFetch'
import SnackBarMod from 'components/SnackBarMod'
import { red300, green300 } from 'material-ui/styles/colors'
import { push } from 'react-router-redux'
import PollFetch from '../components/PollFetch'

export class PollFetchContainer extends Component {
  static propTypes = {
    serverError: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    hasVoted: PropTypes.bool.isRequired,
    successMessage: PropTypes.string.isRequired,
    poll: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    width: PropTypes.number.isRequired,
    currentUser: PropTypes.object.isRequired,
    routeParams: PropTypes.object // from react-router
  };

  state = {
    open: false,
    color: green300,
    message: '',
    showVoteButtons: false
  };

  componentDidMount() {
    const { dispatch, routeParams } = this.props
    dispatch(pollFetch(routeParams.id))
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
    const { serverError, dispatch } = this.props
    // dispatch(resetError()) // don't know why if I activate this then setState below doesn't work
    if (serverError.status &&
        serverError.message.includes('Poll Not Found')) {
      this.setState({ open: false })
      dispatch(push('/'))
    }
    this.setState({ open: false })
  }

  handleRequestClose = (reason) => {
    const { serverError, dispatch } = this.props
    dispatch(resetError())
    if (reason === 'clickaway') {
      if (serverError.status &&
        serverError.message.includes('Poll Not Found')) {
        this.setState({ open: false })
        return dispatch(push('/'))
      }
      this.setState({ open: false })
    }
    this.setState({ open: false })
  }

  handleOptionClick = (e) => {
    const { dispatch } = this.props
    dispatch(pollVote(e.currentTarget.value))
    this.setState({showVoteButtons: false})
  }

  handleVoteClick = () => {
    this.setState({showVoteButtons: !this.state.showVoteButtons})
  }

  render() {
    const { loading, width, poll, currentUser, hasVoted } = this.props
    return <div>
      <PollFetch
        width={width}
        loading={loading}
        poll={poll}
        currentUser={currentUser}
        handleOptionClick={this.handleOptionClick}
        hasVoted={hasVoted}
        handleVoteClick={this.handleVoteClick}
        showVoteButtons={this.state.showVoteButtons}
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
  loading: state.PollFetch.loading,
  serverError: state.PollFetch.error,
  successMessage: state.PollFetch.successMessage,
  poll: state.PollFetch.poll,
  currentUser: state.session.currentUser,
  hasVoted: state.PollFetch.poll.hasVoted
})

export default connect(mapStateToProps)(PollFetchContainer)