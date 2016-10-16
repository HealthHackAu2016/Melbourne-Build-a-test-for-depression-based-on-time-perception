import React, { PropTypes } from 'react'
import sty from './SnackBarMod.scss'
import Snackbar from 'material-ui/Snackbar'

export const SnackBarMod = ({
  open,
  message,
  action,
  onActionTouchTap,
  onRequestClose,
  bodyStyle
}) => (
  <Snackbar
    open={open}
    message={message}
    action={action}
    onActionTouchTap={onActionTouchTap}
    onRequestClose={onRequestClose}
    bodyStyle={bodyStyle}
    className={sty.snackBar}
  />
)

SnackBarMod.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  onActionTouchTap: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  bodyStyle: PropTypes.object
}

export default SnackBarMod
