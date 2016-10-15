import React, { PropTypes } from 'react'
import sty from './<%= pascalEntityName %>.scss'

export const <%= pascalEntityName %> = () => (
  <div className={sty.container}>
    <h1><%= pascalEntityName %></h1>
  </div>
)

<%= pascalEntityName %>.propTypes = {
}

export default <%= pascalEntityName %>
