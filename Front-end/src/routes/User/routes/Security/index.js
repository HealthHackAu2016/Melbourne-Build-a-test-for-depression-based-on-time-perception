import { injectReducer } from 'store/reducers'
import { requireAuth } from 'utils/authHelper'

export default (store) => ({
  path: 'security',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Security = require('./containers/SecurityContainer').default
      const reducer = require('./modules/Security').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'Security', reducer })

      /*  Return getComponent   */
      cb(null, Security)

    /* Webpack named bundle   */
    }, 'Security')
  },
  onEnter (nextState, replace, callback) {
    // make sure user is authenticated before route can be access
    requireAuth(store, nextState, replace, callback)
  }
})
