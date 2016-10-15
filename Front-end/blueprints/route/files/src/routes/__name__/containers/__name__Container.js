import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { <%= pascalEntityName %> } from '../modules/<%= pascalEntityName %>'

import <%= pascalEntityName %> from '../components/<%= pascalEntityName %>'

export class <%= pascalEntityName %>Container extends Component {
  static propTypes = {
    <%= pascalEntityName %>: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    serverError: PropTypes.object.isRequired
  };

  state = {};

  render() {
    return <div>
      <<%= pascalEntityName %> />
    </div>
  }
}

const mapDispatchToProps = {
  <%= pascalEntityName %>
}

const mapStateToProps = (state) => ({
  loading: state.<%= pascalEntityName %>.loading,
  serverError: state.<%= pascalEntityName %>.error
})

export default connect(mapStateToProps, mapDispatchToProps)(<%= pascalEntityName %>Container)