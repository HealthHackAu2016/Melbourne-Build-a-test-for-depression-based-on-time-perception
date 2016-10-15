import React, { PropTypes } from 'react'
import Drawer from 'material-ui/Drawer'
import { MenuItem } from 'material-ui/Menu'
import {Link} from 'react-router'
import NoteAddIcon from 'material-ui/svg-icons/action/note-add'
import AccountBox from 'material-ui/svg-icons/action/account-box'
import Home from 'material-ui/svg-icons/action/home'
import ArrowIn from 'material-ui/svg-icons/action/input'
import SignUpIcon from 'material-ui/svg-icons/action/open-in-browser'
import PollIcon from 'material-ui/svg-icons/social/poll'

const menuItemStylefix = {WebkitAppearance: 'none', cursor: 'pointer'}

export default function SidebarNav ({
  docked, onSidebarLinkClick, open, onSidebarActivate, isAuth, onSidebarLogOutClick, user
}) {
  const authenticatedLinks = [
    <Link to={`/users/profile/${user._id}`} style={{textDecoration: 'none'}} key={1}>
      <MenuItem
        primaryText='My Polls'
        style={menuItemStylefix}
        onTouchTap={onSidebarLinkClick}
        rightIcon={<PollIcon />}
      />
    </Link>,
    <Link to='/user/profile/edit' style={{textDecoration: 'none'}} key={2}>
      <MenuItem
        primaryText='Account'
        style={menuItemStylefix}
        onTouchTap={onSidebarLinkClick}
        rightIcon={<AccountBox />}
      />
    </Link>,
    <Link to='/makePoll' style={{textDecoration: 'none'}} key={3}>
      <MenuItem
        primaryText='Create Poll'
        style={menuItemStylefix}
        onTouchTap={onSidebarLinkClick}
        rightIcon={<NoteAddIcon />}
      />
    </Link>,
    <MenuItem
      primaryText='Log out'
      style={menuItemStylefix}
      onTouchTap={onSidebarLogOutClick}
      rightIcon={<ArrowIn />}
      key={4}
    />
  ]

  const unAuthenticatedLinks = [
    <Link to='/login' style={{textDecoration: 'none'}} key={1}>
      <MenuItem
        primaryText='Login'
        style={menuItemStylefix}
        rightIcon={<ArrowIn />}
        onTouchTap={onSidebarLinkClick}
      />
    </Link>,
    <Link to='/signup' style={{textDecoration: 'none'}} key={2}>
      <MenuItem
        primaryText='Sign up'
        style={menuItemStylefix}
        rightIcon={<SignUpIcon />}
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
          rightIcon={<Home />}
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
  isAuth: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
}
