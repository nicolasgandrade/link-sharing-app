export const environment = {
  production: false,
  auth0: {
    domain: 'replace',
    clientId: 'replace',
    useRefreshTokens: true,
    useRefreshTokensFallback: true,

    authorizationParams: {
      redirect_uri: window.location.origin,
      audience: 'replace',
    },

    httpInterceptor: {
      allowedList: ['http://localhost:3000/*'],
    },
  },
  apiUrl: 'http://localhost:3000',
  pageBaseUrl: 'http://localhost:3000',
};
