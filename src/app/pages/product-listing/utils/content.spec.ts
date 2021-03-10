import { mixAndMerge, getDisplayTilesInfo, IPlpContentRow } from './content';
import { contentMock } from 'src/tests/mocks/content.mock';

describe('content-helpers', () => {
  describe('mixAndMerge', () => {
    it('should mix and merge rows arrays', () => {
      expect(mixAndMerge([{ type: 'a' }, { type: 'b' }, { type: 'c' }], [{ type: '1' }, { type: '2' }])).toEqual([
        { type: 'a' },
        { type: '1' },
        { type: 'b' },
        { type: '2' },
        { type: 'c' },
      ]);
      expect(mixAndMerge([{ type: 'a' }, { type: 'b' }, { type: 'c' }])).toEqual([
        { type: 'a' },
        { type: 'b' },
        { type: 'c' },
      ]);
      expect(mixAndMerge([{ type: 'a' }, { type: 'b' }, { type: 'c' }]));
    });
  });

  describe('getDisplayTilesInfo', () => {
    const contentRows = contentMock().category[0].rows as IPlpContentRow[];
    it('should calculate number of products to display - MOBILE', () => {
      /** DO NOT DISPLAY THE 24th PRODUCT since the last row of product is not completely filled on Mobile */
      expect(getDisplayTilesInfo(contentRows, true, 24, false).productsToDisplay).toEqual(23);
    });
    it('should calculate number of products to display - DESKTOP/TABLET', () => {
      expect(getDisplayTilesInfo(contentRows, false, 24, false).productsToDisplay).toEqual(24);
    });
    it('should show all products on LAST page', () => {
      expect(getDisplayTilesInfo(contentRows, false, 6, true).productsToDisplay).toEqual(6);
    });
  });
});
