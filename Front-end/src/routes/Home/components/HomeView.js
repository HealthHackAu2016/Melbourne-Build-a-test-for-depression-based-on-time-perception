import React from 'react'
import classes from './HomeView.scss'
import {Card, CardHeader} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import sty from './HomeView.scss'

export const HomeView = () => (
  <div className= {sty.container}>
    <Card>
      <CardHeader
        title="Open Interval"
        subtitle="Open"
      />
    </Card>
  </div>
)

export default HomeView
