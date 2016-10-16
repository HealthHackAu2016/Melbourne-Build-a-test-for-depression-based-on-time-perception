import React, { Component, PropTypes } from 'react'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts'

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value } = props

  return (
    <g>
      <text x={cx} y={cy} dy={-15} textAnchor='middle' fill={fill}>{payload.name}</text>
      <text x={cx} y={cy} dy={25} textAnchor='middle' fill={fill}>{`${(percent * 100).toFixed(2)}%`}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  )
}

export class PieChartWrapper extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    colorArray: PropTypes.array.isRequired
  };

  state = { activeIndex: 0 };

  componentDidMount() {
    // set the index to the highest value
    const value = this.props.data.map((obj) => obj.value)
      .reduce((bestIndexSoFar, currentlyTestedValue, currentlyTestedIndex, array) => currentlyTestedValue > array[bestIndexSoFar] ? currentlyTestedIndex : bestIndexSoFar, 0)
    this.setState({activeIndex: value})
  }

  onPieClick = (data, index) => this.setState({ activeIndex: index })

  render () {
    return <ResponsiveContainer height={320}>
      <PieChart onClick={this.onPieClick}>
        <Pie
          activeIndex={this.state.activeIndex}
          activeShape={renderActiveShape}
          data={this.props.data}
          paddingAngle={0.1}
          innerRadius={80}
          style={{cursor: 'pointer'}}
        >
          {this.props.data.map((entry, index) => {
            return <Cell key={index} fill={this.props.colorArray[index]} />
          })}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  }
}

export default PieChartWrapper
