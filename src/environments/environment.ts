export const environment = {
  production: false,
  auth0: {
    domain: 'replace',
    clientId: 'replace',
    authorizationParams: {
      redirect_uri: window.location.origin,
    },
    useRefreshTokens: true,
  },
};
