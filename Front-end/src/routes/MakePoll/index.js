import { injectReducer } from 'store/reducers'
import { requireAuth } from 'utils/authHelper'

export default (store) => ({
  path: 'MakePoll',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const MakePoll = require('./containers/MakePollContainer').default
      const reducer = require('./modules/MakePoll').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'MakePoll', reducer })

      /*  Return getComponent   */
      cb(null, MakePoll)

    /* Webpack named bundle   */
    }, 'MakePoll')
  },
  onEnter (nextState, replace, callback) {
    // make sure user is authenticated before route can be access
    requireAuth(store, nextState, replace, callback)
  }
})
