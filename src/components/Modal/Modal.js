import React, { PropTypes } from 'react'
import {red400} from 'material-ui/styles/colors'
import Dialog from 'material-ui/Dialog'

export default function Modal ({title, actions, modal, open, handleClose, type, message}) {
  return <Dialog
    title={title}
    actions={actions}
    modal={modal}
    open={open}
    onRequestClose={handleClose}
    bodyStyle={type === 'error' ? {color: red400} : ''}
  >
    {message}
  </Dialog>
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  actions: PropTypes.element.isRequired,
  modal: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  type: PropTypes.string,
  message: PropTypes.string.isRequired
}
