import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'profile/edit',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const ProfileEdit = require('./containers/ProfileEditContainer').default
      const reducer = require('./modules/ProfileEdit').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'ProfileEdit', reducer })

      /*  Return getComponent   */
      cb(null, ProfileEdit)

    /* Webpack named bundle   */
    }, 'ProfileEdit')
  }
})
