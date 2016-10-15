/* export const apiUrl = 'https://kevin-voting-app-api.herokuapp.com'*/
export const apiUrl = 'http://localhost:3090'
export const googleOauthParams = {
  url: `${apiUrl}/oauth/google`,
  authorizationUrl: 'https://accounts.google.com/o/oauth2/auth',
  params: {
    client_id: '781005171750-aulvo8dfukpk701v9je8h12rohj5gqg7.apps.googleusercontent.com',
    redirect_uri: 'https://pollwise.herokuapp.com/oauth/google/callback',
    scope: 'openid profile email',
    response_type: 'code'
  }
}
export const githubOauthParams = {
  url: `${apiUrl}/oauth/github`,
  authorizationUrl: 'https://github.com/login/oauth/authorize',
  params: {
    client_id: '1a2a27518c8044d4ac47',
    redirect_uri: 'https://pollwise.herokuapp.com/oauth/github/callback',
    scope: 'user:email profile repo',
    response_type: 'code'
  }
}
