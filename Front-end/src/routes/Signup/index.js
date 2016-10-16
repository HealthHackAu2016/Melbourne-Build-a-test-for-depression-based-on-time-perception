import { injectReducer } from '../../store/reducers'
import { skipIfAuthenticated } from 'utils/authHelper'

export default (store) => ({
  path: 'Signup',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Signup = require('./containers/SignupContainer').default
      const reducer = require('./modules/Signup').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'Signup', reducer })

      /*  Return getComponent   */
      cb(null, Signup)

    /* Webpack named bundle   */
    }, 'Signup')
  },
  onEnter (nextState, replace) {
    // make sure user is authenticated before route can be access
    skipIfAuthenticated(store, nextState, replace)
  }
})
