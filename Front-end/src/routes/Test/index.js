import { injectReducer } from 'store/reducers'
import SecurityRoute from './routes/Security/'

export default (store) => ({
  path: 'Test',
  childRoutes: [
    SecurityRoute(store) // test/security
  ],
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Test = require('./containers/TestContainer').default
      const reducer = require('./modules/Test').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'Test', reducer })

      /*  Return getComponent   */
      cb(null, Test)

    /* Webpack named bundle   */
    }, 'Test')
  }
})
