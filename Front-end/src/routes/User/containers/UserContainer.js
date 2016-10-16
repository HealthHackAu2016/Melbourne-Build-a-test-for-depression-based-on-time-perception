import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import UserNavList from '../components/UserNavList'
import sty from './UserContainer.scss'
import SizeMe from 'react-sizeme'

export class UserContainer extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    location: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    size: PropTypes.object.isRequired // from HOC SizeMe
  }

  componentWillMount() {
    const { location, dispatch } = this.props
    // redirect /user to user/profile edit
    if (location.pathname === '/user/' || location.pathname === '/user') {
      dispatch(push('/user/profile/edit'))
      this.setState({ selectedIndex: '/user/profile/edit' })
    }

    this.setState({ selectedIndex: location.pathname })
  }

  handleRequestChange = (event, index) => {
    this.setState({
      selectedIndex: index
    })
    this.props.dispatch(push(index))
  }

  render() {
    return (
      <div className={sty.container}>
        <UserNavList
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
          width={this.props.size.width}
        />
        {this.props.children}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps)(SizeMe({refreshRate: 300})(UserContainer))
