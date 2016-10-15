import React from 'react'
import classes from './HomeView.scss'
import RaisedButton from 'material-ui/RaisedButton'
import sty from './HomeView.scss'

export const HomeView = () => (
  <div className= {sty.container}>
    <RaisedButton label="Start" primary={true} />
  </div>
)

export default HomeView
