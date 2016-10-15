import React, { PropTypes } from 'react'
import Drawer from 'material-ui/Drawer'
import {MenuItem} from 'material-ui/Menu'
import {Link} from 'react-router'

const menuItemStylefix = {WebkitAppearance: 'none', cursor: 'pointer'}

export function SidebarNav ({
  docked, onSidebarLinkClick, open, onSidebarActivate, isAuth, onSidebarLogOutClick
}) {
  const authenticatedLinks = [
    <Link to='/user/profile/edit' style={{textDecoration: 'none'}} key={1}>
      <MenuItem
        primaryText='Account'
        style={menuItemStylefix}
        onTouchTap={onSidebarLinkClick}
      />
    </Link>,
    <MenuItem
      primaryText='Log out'
      style={menuItemStylefix}
      onTouchTap={onSidebarLogOutClick}
      key={2}
    />
  ]

  const unAuthenticatedLinks = [
    <Link to='/login' style={{textDecoration: 'none'}} key={1}>
      <MenuItem
        primaryText='Login'
        style={menuItemStylefix}
        onTouchTap={onSidebarLinkClick}
      />
    </Link>,
    <Link to='/signup' style={{textDecoration: 'none'}} key={2}>
      <MenuItem
        primaryText='Sign up'
        style={menuItemStylefix}
        onTouchTap={onSidebarLinkClick}
      />
    </Link>
  ]

  return (
    <Drawer
      docked={docked}
      open={open}
      onRequestChange={onSidebarActivate}
    >
      <Link to='/' style={{textDecoration: 'none'}}>
        <MenuItem
          primaryText='Home'
          style={menuItemStylefix}
          onTouchTap={onSidebarLinkClick}
        />
      </Link>
      {isAuth ? authenticatedLinks : unAuthenticatedLinks}
    </Drawer>
  )
}

SidebarNav.propTypes = {
  docked: PropTypes.bool.isRequired,
  onSidebarLinkClick: PropTypes.func.isRequired,
  onSidebarLogOutClick: PropTypes.func.isRequired,
  onSidebarActivate: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  isAuth: PropTypes.bool.isRequired
}

export default SidebarNav
