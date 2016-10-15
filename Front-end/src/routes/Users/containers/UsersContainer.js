import React, { Component, PropTypes } from 'react'
// import { Users } from '../modules/Users'

// import Users from '../components/Users'

export class UsersContainer extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return <div>
      {this.props.children}
    </div>
  }
}

export default UsersContainer
