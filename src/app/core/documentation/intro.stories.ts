import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';

const stories = storiesOf('Intro|Tutorial', module)
  .addDecorator(withKnobs)
  .add('An Introduction', () => {
    return {
      template: `
       <h1>Introduction</h1>
            `,
    };
  });
