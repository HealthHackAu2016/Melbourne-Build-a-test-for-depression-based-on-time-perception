import { injectReducer } from 'store/reducers'
/* import { profileFetch } from './modules/Profile'*/

export default (store) => ({
  path: 'profile/:id',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Profile = require('./containers/ProfileContainer').default
      const reducer = require('./modules/Profile').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'Profile', reducer })

      /*  Return getComponent   */
      cb(null, Profile)

    /* Webpack named bundle   */
    }, 'Profile')
  },
  // lesson: because of code splitting it's best not to do api fetch in onEnter because the api response might come back before the code split is loaded into browser. Right not the best is to do it the container using componentDidMount

  /* onEnter (nextState, replace, callback) {
   *   // check back in production so see if this can be remove, for some reason profile Fetch is getting call first before all the other session action. I think it's because of the code splitting prioritising this first.
   *   setTimeout(function() {
   *     console.log(nextState.params.id)
   *     store.dispatch(profileFetch(nextState.params.id))
   *   }, 2000)
   *   callback()
   * }*/
})
