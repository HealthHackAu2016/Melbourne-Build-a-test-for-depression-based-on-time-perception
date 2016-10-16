import { injectReducer } from 'store/reducers'
import { resetToInitialState } from './modules/PollFetch'

export default (store) => ({
  path: 'poll/:id',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const PollFetch = require('./containers/PollFetchContainer').default
      const reducer = require('./modules/PollFetch').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'PollFetch', reducer })

      /*  Return getComponent   */
      cb(null, PollFetch)

    /* Webpack named bundle   */
    }, 'PollFetch')
  },
  onEnter (nextState, replace, callback) {
    // make sure user is authenticated before route can be access
    store.dispatch(resetToInitialState())
    callback()
  }
})
