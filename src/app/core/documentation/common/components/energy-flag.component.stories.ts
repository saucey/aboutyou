import { select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';
import { EnergyFlagComponent } from 'src/app/common/components/energy-flag/energy-flag.component';

storiesOf('Components|EnergyFlag', module)
  .addParameters({ component: EnergyFlagComponent })
  .addDecorator(withKnobs)
  .add('default', () => {
    const options = {
      A: 'A',
      'A+': 'A+',
      'A++': 'A++',
      'A++ - E': 'appe',
      B: 'B',
      C: 'C',
      D: 'D',
      E: 'E',
    };
    const defaultValue = 'A ++';

    const type = select('type', options, defaultValue);

    return {
      component: EnergyFlagComponent,
      props: {
        type,
      },
    };
  });
