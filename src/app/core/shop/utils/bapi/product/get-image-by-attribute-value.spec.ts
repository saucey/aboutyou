import { getDisplayMoodImage } from './get-image-by-attribute-value';
import { SAMPLE_PRODUCT } from 'src/tests/fixtures/products/sample';

describe('get-image-by-attribute-value', () => {
  it('getDisplayMoodImage', () => {
    expect(getDisplayMoodImage(SAMPLE_PRODUCT.images, 'Winter')).toEqual({
      hash: 'images/5119c4de4e9b50aa9c751ec5a88f8d2b',
      attributes: Object({
        imageTags: Object({
          id: 685,
          key: 'imageTags',
          label: 'Hover-Bild',
          type: '',
          multiSelect: true,
          values: [Object({ id: 9056, label: 'Hover-Bild', value: 'mood' })],
        }),
      }),
    });
  });
});
