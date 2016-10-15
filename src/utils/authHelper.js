import { getCurrentUser } from 'redux/session'

export const requireAuth = (store, nextState, replace, callback) => {
  const token = localStorage.getItem('token')
  const { currentUser } = store.getState().session
  if (!currentUser && token) {
    store.dispatch(getCurrentUser())
  }
  if (!token) {
    replace('/login')
  }

  callback()
}

export const skipIfAuthenticated = (store, nextState, replace) => {
  const token = localStorage.getItem('token')
  const { currentUser } = store.getState().session

  // if token exist and there is a user in session
  if (token && currentUser) {
    replace('/')
  }
}
