const PROXY_CONFIG = [
  {
    context: '/api',
    target: 'http://localhost:3000',
    secure: false,
    logLevel: 'info',
    changeOrigin: true,
  },
  {
    context: '/prudsys',
    target: 'https://depot.personalization.air.prudsys.com',
    secure: true,
    logLevel: 'debug',
    changeOrigin: true,
    pathRewrite: {
      '^/prudsys': '',
    },
  },
];

module.exports = PROXY_CONFIG;
