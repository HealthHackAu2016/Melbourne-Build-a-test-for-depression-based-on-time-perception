import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { level1 } from '../modules/Level1'

import Level1 from '../components/Level1'

export class Level1Container extends Component {
  static propTypes = {
    Level1: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    serverError: PropTypes.object.isRequired
  };

  state = {};

  render() {
    return <div>
      <Level1 />
    </div>
  }
}

const mapDispatchToProps = {
  level1
}

const mapStateToProps = (state) => ({
  loading: state.Level1.loading,
  serverError: state.Level1.error
})

export default connect(mapStateToProps, mapDispatchToProps)(Level1Container)
