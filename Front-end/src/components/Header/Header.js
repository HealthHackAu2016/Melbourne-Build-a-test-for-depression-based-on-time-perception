import React, { PropTypes } from 'react'
import AppBar from 'material-ui/AppBar'
import {small} from 'utils/windowsize.js'
import {IndexLink, Link} from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import {MenuItem} from 'material-ui/Menu'
import DropDownMenu from 'material-ui/DropDownMenu'

const menuItemStylefix = {WebkitAppearance: 'none', cursor: 'pointer'}

export function Header ({
  mobileMenuClick,
  isAuth,
  user,
  onDropDownMenuChange,
  link,
  width,
  handleTitleClick
}) {
  return (
    <AppBar
      title={<IndexLink to='/' style={{color: 'white', textDecoration: 'none'}} onClick={handleTitleClick}>TDT</IndexLink>}
      showMenuIconButton={width < small}
      titleStyle={getStyle(width).appBarTitle}
      style={getStyle(width).appBar}
      onLeftIconButtonTouchTap={mobileMenuClick}
    >
    {
    isAuth ? <DropDownMenu value={link} onChange={onDropDownMenuChange}
      menuStyle={{padding: '0px'}} style={getStyle(width).navLinkButton}>
      <MenuItem value={'/'} primaryText='Home' label={user.firstName} style={menuItemStylefix} />
      <MenuItem value={'/user/profile/edit'} primaryText='Account' label='Account' style={menuItemStylefix} />
      <MenuItem value={'logOut'} primaryText='Log out' label='Log out' style={menuItemStylefix} />
    </DropDownMenu>
    : <div style={getStyle(width).navLinkButton}>
      <Link to='/login'>
        <FlatButton label='Log in' style={getStyle(width).navLink} />
      </Link>
      <Link to='/signup' key={1}>
        <RaisedButton label='Sign up' />
      </Link>
    </div>}
    </AppBar>
  )
}

Header.propTypes = {
  width: PropTypes.number.isRequired,
  onDropDownMenuChange: PropTypes.func.isRequired,
  handleTitleClick: PropTypes.func.isRequired,
  mobileMenuClick: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  link: PropTypes.string.isRequired
}

function getStyle(width) {
// lesson: to stop css flicker use inline style for simple component or critical component like header
  let styles = {
    navLink: {
      height: '64px',
      color: 'white',
      marginRight: '0.5em'
    },
    navLinkButton: {
      display: 'flex',
      alignItems: 'center'
    }
  }

  if (width <= small) {
    styles = {
      ...styles,
      appBarTitle: {
        justifyContent: 'center',
        flex: '',
        margin: '0 auto'
      },
      navLink: {
        display: 'none'
      },
      navLinkButton: {
        display: 'none'
      },
      appBar: {
        paddingRight: '62px' // to make the logo in the center
      }
    }
  }

  return styles
}

export default (Header)
