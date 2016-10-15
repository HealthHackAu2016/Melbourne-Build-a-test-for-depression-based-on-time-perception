import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'settings',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const UserSettings = require('./containers/UserSettingsContainer').default
      const reducer = require('./modules/UserSettings').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'UserSettings', reducer })

      /*  Return getComponent   */
      cb(null, UserSettings)

    /* Webpack named bundle   */
    }, 'UserSettings')
  }
})
