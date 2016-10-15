import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Level1 from '../components/Level1'

export class Level1Container extends Component {
  render() {
    return (
      <Level1 />
    )
  }
}

const mapActionCreators = {
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, mapActionCreators)(Level1Container)