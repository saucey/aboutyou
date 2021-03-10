import { findActiveCategoryByPath } from './categories';
import { FIXTURE_CATEGORIES } from 'src/tests/fixtures/categories';

describe('findActiveCategoryByPath', () => {
  it('should find active category', () => {
    expect(findActiveCategoryByPath('/gedeckter-tisch-kueche/tischwaesche', FIXTURE_CATEGORIES)).toEqual(
      FIXTURE_CATEGORIES[3].children[0],
    );
  });
});
