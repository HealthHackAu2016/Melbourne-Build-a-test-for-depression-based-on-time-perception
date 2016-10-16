import React from 'react'
import sty from './NotFound.scss'
import { Link } from 'react-router'
import {List, ListItem} from 'material-ui/List'
import ActionHome from 'material-ui/svg-icons/action/home'
import AccountBox from 'material-ui/svg-icons/action/account-box'

export const NotFound = () => (
  <div className={sty.container}>
    <h1>Oops!</h1>
    <h3>We can't seem to find the page you're looking for.</h3>
    <p>Here are some useful links instead:</p>
    <List>
      <Link to='/' style={{textDecoration: 'none'}}>
        <ListItem primaryText='Home' leftIcon={<ActionHome />} />
      </Link>
      <Link to='/user/edit' style={{textDecoration: 'none'}}>
        <ListItem primaryText='Profile' leftIcon={<AccountBox />} />
      </Link>
    </List>
  </div>
)

export default NotFound
