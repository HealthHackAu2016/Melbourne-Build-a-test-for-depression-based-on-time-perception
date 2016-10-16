import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import DynamicForm from './DynamicForm'
import Snackbar from 'material-ui/Snackbar'
import { red300, green300 } from 'material-ui/styles/colors'
import { makePoll } from '../modules/MakePoll'
import { push } from 'react-router-redux'
import { reset } from 'redux-form'

// lesson: this externall css is making snack bar styling flicker in dev, have to check back to see if it happens in when deploy to production
import sty from './MakePollContainer.scss'

export class MakePollContainer extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    serverError: PropTypes.object.isRequired,
    successMessage: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    width: PropTypes.number.isRequired,
    poll: PropTypes.object.isRequired
  };

  state = {
    fields: {
      question: 'Question',
      option1: 'Option 1',
      option2: 'Option 2'
    },
    color: green300,
    open: false,
    message: '',
    count: 2
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.serverError.status !== this.props.serverError.status) {
      this.setState({open: nextProps.serverError.status, color: red300, message: nextProps.serverError.message})
    }
    if (nextProps.successMessage !== this.props.successMessage) {
      this.setState({open: true, color: green300, message: nextProps.successMessage})
    }
  }

  // need to fix the minor bug of double tap to adding fields and delele the last option and adding another one immediatedly.
  handleAdd = (e) => {
    const { count, fields } = this.state
    this.setState({
      fields: {
        ...fields,
        [`option${count + 1}`]: `Option ${count + 1}`
      },
      count: count + 1
    })
  }

  handleTouchTap = () => {
    this.setState({
      open: true
    })
  }

  handleActionTouchTap = () => {
    if (this.props.serverError.status) {
      this.setState({
        open: false
      })
    } else {
      this.props.dispatch(push(`/poll/${this.props.poll.id}`))
    }
  }

  handleRequestClose = (reason) => {
    const { serverError } = this.props
    if (reason === 'clickaway') {
      // if there is error and it's not a network error then reset the form
      if (serverError.status && !serverError.message.includes('Network')) {
        this.props.dispatch(reset('MakePoll'))
      }
    }
    this.setState({
      open: false
    })
  }

  handleFormSubmit = (fields) => this.props.dispatch(makePoll(fields))

  handleDeleteOption = (option) => {
    const {fields, count} = this.state
    delete fields[option.currentTarget.value]
    this.setState({fields: fields})
    this.setState({count: count - 1})
  }

  render() {
    return <div>
      <DynamicForm
        onFormSubmit={this.handleFormSubmit}
        fields={Object.keys(this.state.fields)}
        labels={this.state.fields}
        handleAdd={this.handleAdd}
        loading={this.props.loading}
        width={this.props.width}
        onOptionDelete={this.handleDeleteOption}
      />
      <Snackbar
        open={this.state.open}
        message={this.state.message}
        action={this.props.serverError.status ? 'Dismiss' : 'Go To Poll'}
        onActionTouchTap={this.handleActionTouchTap}
        onRequestClose={this.handleRequestClose}
        bodyStyle={{backgroundColor: this.state.color}}
        className={sty.snackBar}
      />
    </div>
  }
}

const mapStateToProps = (state) => ({
  serverError: state.MakePoll.error,
  loading: state.MakePoll.loading,
  successMessage: state.MakePoll.successMessage,
  poll: state.MakePoll.poll
})

export default connect(mapStateToProps)(MakePollContainer)
