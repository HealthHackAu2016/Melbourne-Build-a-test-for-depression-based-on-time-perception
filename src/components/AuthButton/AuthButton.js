import React, { PropTypes } from 'react'
import sty from './AuthButton.scss'
import RaisedButton from 'material-ui/RaisedButton'

export default function AuthButton ({label, type, childType, link, backgroundColor, handleClick}) {
  if (childType === 'none') {
    return <RaisedButton
      label={label}
      primary={type === 'primary'}
      secondary={type === 'secondary'}
      labelPosition='before'
      className={sty.button}
      backgroundColor={backgroundColor}
      onTouchTap={handleClick}
    />
  }
  if (childType === 'input') {
    return <RaisedButton
      label={label}
      primary={type === 'primary'}
      secondary={type === 'secondary'}
      labelPosition='before'
      className={sty.button}
      backgroundColor={backgroundColor}
      onTouchTap={handleClick}
    >
      <input type='submit' className={sty.input} />
    </RaisedButton>
  }
  if (childType === 'link') {
    return <RaisedButton
      label={label}
      primary={type === 'primary'}
      secondary={type === 'secondary'}
      labelPosition='before'
      className={sty.button}
      backgroundColor={backgroundColor}
      onTouchTap={handleClick}
    >
      <a href={link} className={sty.input}></a>
    </RaisedButton>
  }
}

AuthButton.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  childType: PropTypes.string.isRequired,
  link: PropTypes.string,
  backgroundColor: PropTypes.string,
  handleClick: PropTypes.func

}
