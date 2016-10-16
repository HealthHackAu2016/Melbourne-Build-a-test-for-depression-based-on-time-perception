import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { games } from '../modules/Games'

import Games from '../components/Games'

export class GamesContainer extends Component {
  static propTypes = {
    Games: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    serverError: PropTypes.object.isRequired
  };

  state = {};

  render() {
    return <div>
      <Games />
    </div>
  }
}

const mapDispatchToProps = {
  games
}

const mapStateToProps = (state) => ({
  loading: state.Games.loading,
  serverError: state.Games.error
})

export default connect(mapStateToProps, mapDispatchToProps)(GamesContainer)
