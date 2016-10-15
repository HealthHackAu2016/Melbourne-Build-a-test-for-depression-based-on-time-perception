import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import <%= pascalEntityName %> from '../components/<%= pascalEntityName %>'

export class <%= pascalEntityName %>Container extends Component {
  render() {
    return (
      <<%= pascalEntityName %> />
    )
  }
}

const mapActionCreators = {
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, mapActionCreators)(<%= pascalEntityName %>Container)