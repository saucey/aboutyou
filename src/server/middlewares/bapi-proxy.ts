const proxy = require('http-proxy-middleware');
import { Application } from 'express';
import { getBapiConnectionUrl, getBapiAuth } from '../../app/core/services/resolveEnvs';

export function addBapiProxyMiddleware(application: Application) {
  application.use((_, __, next) => {
    setTimeout(next, 0); // <== change this value to simulate delays in bapi calls
  });

  application.use(
    '/api/bapi',
    proxy({
      target: getBapiConnectionUrl(),
      pathRewrite: {
        '^/api/bapi': '',
      },
      changeOrigin: true,
      secure: true,
      auth: `${getBapiAuth().username}:${getBapiAuth().password}`,
      router() {
        return getBapiConnectionUrl();
      },
    }),
  );
}
