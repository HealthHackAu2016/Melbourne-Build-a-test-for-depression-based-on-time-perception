import React, { PropTypes } from 'react'
import {List, ListItem, MakeSelectable} from 'material-ui/List'
import { small, medium } from 'utils/windowsize.js'
import AccountBox from 'material-ui/svg-icons/action/account-box'
import Settings from 'material-ui/svg-icons/action/settings'
import Security from 'material-ui/svg-icons/hardware/security'

const SelectableList = MakeSelectable(List)

export const UserNavList = ({value, onChange, width}) => (
  <SelectableList
    value={value}
    onChange={onChange}
    style={style(width)}
  >
    <ListItem
      value='/user/profile/edit'
      primaryText='Edit Profile'
      leftIcon={<AccountBox />}
    />
    <ListItem
      value='/user/security'
      primaryText='Security'
      leftIcon={<Security />}

    />
    <ListItem
      value='/user/settings'
      primaryText='Account Settings'
      leftIcon={<Settings />}
    />
  </SelectableList>
)

UserNavList.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired
}

const style = (width) => {
  const sty = {
    width: '320px',
    paddingTop: '0px',
    paddingBottom: '0px',
    margin: '2em auto',
    marginBottom: '3em',
    overflow: 'hidden'
  }

  if (width > medium) return {...sty, width: '230px'}
  if (width > small) return {...sty, width: '494px'}
  return sty
}

export default UserNavList
