import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { githubLogin, githubOauthError } from '../modules/GithubOauth'
import LoadingSpinner from 'components/LoadingSpinner'
import Modal from 'components/Modal'
import RaisedButton from 'material-ui/RaisedButton'
import { push } from 'react-router-redux'

export class GithubOauthContainer extends Component {
  static propTypes = {
    github: PropTypes.object.isRequired, // from GithubOauth state
    width: PropTypes.number.isRequired, // from Size Me HoC
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object // from react-router
  };

  state = { open: false };

  componentWillReceiveProps(nextProps) {
    if (nextProps.github.error.status !== this.props.github.error.status) {
      this.setState({open: nextProps.github.error.status})
    }
  }

  componentDidMount() {
    const {location: {query}, dispatch} = this.props
    if (query.error) {
      return dispatch(githubOauthError({message: query.error_description, status: true}))
    }
    dispatch(githubLogin(query.code))
  }

  handleClose = () => {
    this.setState({open: false})
    this.props.dispatch(push('/login'))
  }

  render() {
    const { github } = this.props
    return (
      <div>
        <LoadingSpinner message='Logging you in...' />
        <Modal
          title='Github Oauth Login Error'
          modal={false}
          type='error'
          open={this.state.open}
          handleClose={this.handleClose}
          message={github.error.message}
          actions={<RaisedButton label='Dismiss' primary onTouchTap={this.handleClose} />}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ github: state.GithubOauth })

export default connect(mapStateToProps)(GithubOauthContainer)
