import { environment } from 'src/environments/environment.production';
import { filter } from 'src/app/configs/plp/filter';

const parseFilterConfig = () => {
  const res = [];

  for (const key in filter) {
    if (filter.hasOwnProperty(key)) {
      res.push('/*?*' + filter[key].urlParam);
    }
  }

  return res;
};

export default () => {
  return {
    policy: [
      {
        userAgent: '*',
        allow: '*',
        disallow: ['/search', '/checkout'].concat(parseFilterConfig()),
      },
    ],
    sitemap: environment.shopHostUrl + '/sitemap.xml',
    host: environment.shopHostUrl,
  };
};
