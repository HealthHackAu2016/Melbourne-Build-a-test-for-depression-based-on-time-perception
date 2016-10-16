import React, {PropTypes} from 'react'
import sty from './SubmitButton.scss'
import browser from 'detect-browser'
import RaisedButton from 'material-ui/RaisedButton'

export default function SubmitButton({label, type}) {
  if (browser.name === 'firefox') {
    return <button type='submit' className={sty.firefox}>{label}</button>
  }

  return (
    <RaisedButton
      label={label}
      primary={type === 'primary'}
      secondary={type === 'secondary'}
      labelPosition='before'
    >
      <input type='submit' className={sty.input} />
    </RaisedButton>
  )
}

SubmitButton.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}
