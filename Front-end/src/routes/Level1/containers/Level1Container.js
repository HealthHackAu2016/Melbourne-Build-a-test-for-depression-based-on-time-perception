import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { level1, onIntervalStart, onIntervalStop } from '../modules/Level1'

import IntervalIntroPage from '../components/IntervalIntroPage'
import Interval1 from '../components/Interval1'

export class Level1Container extends Component {
  static propTypes = {
    level1: PropTypes.func.isRequired,
    serverError: PropTypes.object.isRequired,
    currentInterval: PropTypes.number.isRequired,
    onIntervalStart: PropTypes.func.isRequired,
    onIntervalStop: PropTypes.func.isRequired,
    intervals: PropTypes.array.isRequired
  };

  state = {};

  renderInvervalPageOrIntervalIntro = (currentInterval) => {
    const {instruction, level1, intervals, onIntervalStart, onIntervalStop, intervalStarted} = this.props
    const interval = intervals[currentInterval]
    if (currentInterval === -1) {
      return <IntervalIntroPage
               currentInterval={currentInterval}
               instruction={instruction}
               onGameStart={level1}
             />
    }

    if (currentInterval === 0) {
      return <Interval1
      currentInterval={currentInterval}
      instruction={intervals[currentInterval].instruction}
      onIntervalStart={onIntervalStart}
      onIntervalStop={onIntervalStop}
      intervalStarted={intervalStarted}
      time={interval.time}
      />
    }
  }

  render() {
    const {currentInterval} = this.props
    return (
      <div>
        {this.renderInvervalPageOrIntervalIntro(currentInterval)}
      </div>
    )}
}

const mapDispatchToProps = {
  level1,
  onIntervalStart,
  onIntervalStop
}

const mapStateToProps = (state) => ({
  serverError: state.Level1.error,
  instruction: state.Level1.instruction,
  currentInterval: state.Level1.currentInterval,
  intervalStarted: state.Level1.intervalStarted,
  intervals: state.Level1.intervals
})

export default connect(mapStateToProps, mapDispatchToProps)(Level1Container)
