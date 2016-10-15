import { injectReducer } from '../../store/reducers'
import { skipIfAuthenticated } from 'utils/authHelper'

export default (store) => ({
  path: 'reset_password/:token',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const ResetPassword = require('./containers/ResetPasswordContainer').default
      const reducer = require('./modules/ResetPassword').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'ResetPassword', reducer })

      /*  Return getComponent   */
      cb(null, ResetPassword)

    /* Webpack named bundle   */
    }, 'ResetPassword')
  },
  onEnter (nextState, replace) {
    // make sure user is authenticated before route can be access
    skipIfAuthenticated(store, nextState, replace)
  }
})
