import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { homeFetchError, resetError, homeFetch } from '../modules/Home'
import { red300 } from 'material-ui/styles/colors'
import SnackBarMod from 'components/SnackBarMod'
import { push } from 'react-router-redux'
import Home from '../components/Home'

export class HomeContainer extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    serverError: PropTypes.object.isRequired,
    polls: PropTypes.array.isRequired,
    authenticated: PropTypes.bool.isRequired,
    width: PropTypes.number.isRequired // from HOC SizeMe
  };

  state = {
    open: false,
    color: red300,
    message: ''
  };

  componentDidMount() {
    /* this.props.dispatch(homeFetch())*/
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.serverError.status !== this.props.serverError.status) {
      if (nextProps.authenticated) {
        return
      }
      this.setState({open: nextProps.serverError.status, color: red300, message: nextProps.serverError.message})
    }
  }

  handleTouchTap = () => this.setState({ open: true })

  handleActionTouchTap = () => {
    this.setState({ open: false })
    if (this.state.message.includes('start the game')) {
      this.props.dispatch(push('/login'))
    }
    this.props.dispatch(resetError())
  }

  handleRequestClose = (reason) => {
    this.props.dispatch(resetError())
    this.setState({ open: false })
  }

  onGameStart= () => {
    console.log('game starting')
    const {authenticated, dispatch} = this.props
    if (authenticated) {
      dispatch(push('/games'))
    }
    dispatch(homeFetchError({message: 'Log in or signup to start the game', status: true}))
  }

  render() {
    const { polls, width, loading } = this.props
    return <div>
      <Home
        width={width}
        loading={loading}
        onGameStart={this.onGameStart}
      />
      <SnackBarMod
        open={this.state.open}
        message={this.state.message}
        action={this.state.message.includes('start the game') ? 'Log in' : 'Dismiss'}
        onActionTouchTap={this.handleActionTouchTap}
        onRequestClose={this.handleRequestClose}
        bodyStyle={{backgroundColor: this.state.color}}
      />
    </div>
  }
}

const mapStateToProps = (state) => ({
  loading: state.Home.loading,
  serverError: state.Home.error,
  polls: state.Home.polls,
  authenticated: state.session.authenticated
})

export default connect(mapStateToProps)(HomeContainer)
