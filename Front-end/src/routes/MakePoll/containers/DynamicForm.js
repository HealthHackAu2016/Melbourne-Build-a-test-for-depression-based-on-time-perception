import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import MakePoll from '../components/MakePoll'
import {capitalizeFirstLetter} from 'utils/general'

class DynamicForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    onFormSubmit: PropTypes.func.isRequired
  };

  render() {
    const { handleSubmit, onFormSubmit } = this.props
    return <MakePoll
      {...this.props}
      handleSubmit={handleSubmit(onFormSubmit.bind(this))}
    />
  }
}

// todo check for length limit to 64 characters for options
function validate(formProps) {
  const errors = {}
  Object.keys(formProps).map((name, index) => {
    if (!formProps[name]) {
      errors[name] = `${capitalizeFirstLetter(name)} can't not be blank.`
    }
    if (name !== 'question') {
      if (formProps[name]) {
        if (formProps[name].length > 64) {
          errors[name] = 'Max length allow'
        }
      }
    }
  })

  return errors
}

export default reduxForm({ form: 'MakePoll', validate })(DynamicForm)
