import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { test } from '../modules/Test'

import Test from '../components/Test'

export class TestContainer extends Component {
  static propTypes = {
    Test: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    serverError: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired,
  };

  state = {};

  render() {
    return <div>
      <Test />
      {this.props.children}
    </div>
  }
}

const mapDispatchToProps = {
  Test
}

const mapStateToProps = (state) => ({
  loading: state.Test.loading,
  serverError: state.Test.error
})

export default connect(mapStateToProps, mapDispatchToProps)(TestContainer)
