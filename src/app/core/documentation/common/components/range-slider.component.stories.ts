import { withKnobs, text, number } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';
import { Ng5SliderModule } from 'ng5-slider';
import { RangeSliderComponent } from 'src/app/common/components/range-slider/range-slider.component';
import { action } from '@storybook/addon-actions';

storiesOf('Components|RangeSlider', module)
  .addParameters({ component: RangeSliderComponent })
  .addDecorator(withKnobs)
  .add('default', () => {
    return {
      component: RangeSliderComponent,
      props: {
        value: {
          min: number('value.min', 10),
          max: number('value.max', 30),
        },
        floor: number('floor', 0),
        ceil: number('ceil', 150),
        onChange: action('onChange'),
        onChangeCommit: action('onChangeCommit'),
      },
      moduleMetadata: {
        declarations: [RangeSliderComponent],
        imports: [Ng5SliderModule],
      },
    };
  });
