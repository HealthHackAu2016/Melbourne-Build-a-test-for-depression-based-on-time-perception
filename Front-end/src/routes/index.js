// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import Home from './Home'
import LoginRoute from './Login'
import SignupRoute from './Signup'
import ForgotPasswordRoute from './ForgotPassword'
import ResetPasswordRoute from './ResetPassword'
import GithubOauthCallbackRoute from './GithubOauth'
import GoogleOauthCallbackRoute from './GoogleOauth'
import NotFoundRoute from './NotFound'
import UserRoute from './User'
import TestRoute from './Test'
import UsersUnAuthRoute from './Users'
import MakePollRoute from './MakePoll/'
import PollFetchRoute from './PollFetch'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Home(store),
  childRoutes: [
    LoginRoute(store),
    SignupRoute(store),
    ForgotPasswordRoute(store),
    ResetPasswordRoute(store),
    GoogleOauthCallbackRoute(store),
    GithubOauthCallbackRoute(store),
    PollFetchRoute(store), // /poll/:id
    MakePollRoute(store), // /makePoll
    UserRoute(store), // user
    TestRoute(store), // user
    UsersUnAuthRoute(store), // users
    NotFoundRoute(store) // /*
  ]
})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
