import { environment } from 'src/environments/environment.production';

const SitemapGenerator = require('sitemap-generator');

// create generator
const generator = SitemapGenerator(environment.shopHostUrl, {
  stripQuerystring: false,
  filepath: './src/assets/sitemap.xml',
});

// start the crawler
generator.start();
