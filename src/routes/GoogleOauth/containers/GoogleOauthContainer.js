import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { googleLogin, googleOauthError } from '../modules/GoogleOauth.js'
import LoadingSpinner from 'components/LoadingSpinner'
import Modal from 'components/Modal'
import RaisedButton from 'material-ui/RaisedButton'
import { push } from 'react-router-redux'

export class GoogleOauthContainer extends Component {
  static propTypes = {
    google: PropTypes.object.isRequired, // from GoogleOauth state
    width: PropTypes.number.isRequired, // from Size Me HoC
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object // from react-router
  };

  state = { open: false };

  componentWillReceiveProps(nextProps) {
    if (nextProps.google.error.status !== this.props.google.error.status) {
      this.setState({open: nextProps.google.error.status})
    }
  }

  componentDidMount() {
    const {location: {query}, dispatch} = this.props
    if (query.error) {
      return dispatch(googleOauthError({message: query.error, status: true}))
    }
    dispatch(googleLogin(query.code))
  }

  handleClose = () => {
    this.setState({open: false})
    this.props.dispatch(push('/login'))
  }

  render() {
    const { google } = this.props
    return (
      <div>
        <LoadingSpinner message='Logging you in...' />
        <Modal
          title='Google Oauth Error'
          modal={false}
          type='error'
          open={this.state.open}
          handleClose={this.handleClose}
          message={google.error.message}
          actions={<RaisedButton label='Dismiss' primary onTouchTap={this.handleClose} />}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ google: state.GoogleOauth })

export default connect(mapStateToProps)(GoogleOauthContainer)
