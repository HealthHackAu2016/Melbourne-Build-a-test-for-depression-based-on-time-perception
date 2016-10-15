import React, { PropTypes } from 'react'
import sty from './<%= pascalEntityName %>.scss'

export const <%= pascalEntityName %> = () => (
  <div className={sty.container}>
    <h4><%= pascalEntityName %></h4>
  </div>
)

<%= pascalEntityName %>.propTypes = {
  : PropTypes.
}

export default <%= pascalEntityName %>
