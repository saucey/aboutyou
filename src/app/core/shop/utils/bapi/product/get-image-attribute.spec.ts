import { getImageAttribute } from './get-image-attribute';
import { SAMPLE_PRODUCT } from 'src/tests/fixtures/products/sample';

describe('get-image-attribute', () => {
  it('should get image attribute', () => {
    expect(getImageAttribute('imageTags', SAMPLE_PRODUCT.images)).toEqual({
      id: 685,
      key: 'imageTags',
      label: 'Hover-Bild',
      type: '',
      multiSelect: true,
      values: [Object({ id: 9056, label: 'Hover-Bild', value: 'mood' })],
    });
  });
});
