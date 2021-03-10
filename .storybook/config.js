import { configure, addParameters, addDecorator } from '@storybook/angular';
import { withA11y } from '@storybook/addon-a11y';
import { extractProps, extractComponentDescription, setCompodocJson } from './compodoc';
import theme from './theme';
import '../src/app/common/styles/styles.scss';

import docJson from '../documentation.json';

setCompodocJson(docJson);

addDecorator(withA11y);

addParameters({
  options: {
    name: 'Storefront',
    theme: theme,
  },
  docs: {
    // inlineStories: true,
    iframeHeight: '500px',
    extractProps,
    extractComponentDescription,
  },
});
// automatically import all files ending in *.stories.ts
configure(require.context('../src/app/core/documentation', true, /\.stories\.(ts|mdx)/), module);
configure(require.context('../src/app', true, /\.stories\.(ts|mdx)/), module);
