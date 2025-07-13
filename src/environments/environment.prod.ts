export const environment = {
  production: true,
  auth0: {
    domain: 'dev-4e2syihokjzpldt7.us.auth0.com',
    clientId: 'ji4eXP9P0EUdo6ZBA7v5X1GIPE82dB3X',
    useRefreshTokens: true,
    useRefreshTokensFallback: true,

    authorizationParams: {
      redirect_uri: 'https://nicolasgandrade.github.io/link-sharing-app',
      audience: 'https://api.streamerbridge.com',
    },

    httpInterceptor: {
      allowedList: ['https://enderlinks.nicolasgandrade.com/*'],
    },
  },
  apiUrl: 'https://enderlinks.nicolasgandrade.com/api',
  pageBaseUrl: 'https://nicolasgandrade.github.io/link-sharing-app',
  previewBaseUrl: 'https://enderlinks.nicolasgandrade.com',
};
