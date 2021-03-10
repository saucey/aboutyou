import range from 'ramda/es/range';

const SPANS_PER_ROW_MOBILE = 2;
const SPANS_PER_ROW_TABLET_UP = 3;
const ROW_GAP_BETWEEN_CONTENT_TILES = 5;

export const filterContentRowsByTypes = (types: string[]) => (rows: IPlpContentRow[]) =>
  rows.filter(({ type }) => types.includes(type));

export interface IPlpContentRow {
  type: string;
  attributes?: {
    position?: number;
    areas?: ('left' | 'right')[];
  };
}

// This merges the single and double tiles in a interwoven manner
export const mixAndMerge = ([row, ...remainingRows]: IPlpContentRow[], rowsOfNextArray: IPlpContentRow[] = []) =>
  row === undefined ? rowsOfNextArray : [row, ...mixAndMerge(rowsOfNextArray, remainingRows)];

const getSingleTileColumnStartIndex = (isMobile: boolean, tileIndex: number) =>
  isMobile
    ? // => MOBILE
      tileIndex % SPANS_PER_ROW_MOBILE === 0
      ? 2
      : 1
    : // => TABLETS and UP
    tileIndex % SPANS_PER_ROW_TABLET_UP === 0
    ? 3
    : tileIndex % SPANS_PER_ROW_TABLET_UP === 2
    ? 2
    : 1;

const getSingleTileColumnEndIndex = (isMobile: boolean, tileIndex: number) =>
  isMobile
    ? // => MOBILE
      tileIndex % SPANS_PER_ROW_MOBILE === 0
      ? 3
      : 2
    : // => TABLET and UP
    tileIndex % SPANS_PER_ROW_TABLET_UP === 0
    ? 4
    : tileIndex % SPANS_PER_ROW_TABLET_UP === 2
    ? 3
    : 2;

export const getDisplayTilesInfo = (
  rows: IPlpContentRow[],
  isMobile: boolean,
  productCount: number,
  isLastPage: boolean,
) => {
  const normalSingleTiles = filterContentRowsByTypes(['single_tile'])(rows);
  const bundleSingleTiles = filterContentRowsByTypes(['single_bundle_tile'])(rows);

  const singleTiles = mixAndMerge(normalSingleTiles, bundleSingleTiles);

  const normalDoubleTiles = filterContentRowsByTypes(['double_tile'])(rows);
  const bundleDoubleTiles = filterContentRowsByTypes(['grid_of_two_aligned'])(rows);
  const gridOfTwoDoubleTiles = filterContentRowsByTypes(['double_bundle_tile'])(rows);

  const doubleTiles = mixAndMerge(gridOfTwoDoubleTiles, [...normalDoubleTiles, ...bundleDoubleTiles]);

  const singleTilePositions = singleTiles.map((row, index) => {
    const realIndex = index + 1;
    const rowNumber = realIndex * ROW_GAP_BETWEEN_CONTENT_TILES - 2;

    const colStart = getSingleTileColumnStartIndex(isMobile, realIndex);
    const colEnd = getSingleTileColumnEndIndex(isMobile, realIndex);

    return {
      position: isMobile
        ? (rowNumber - 1) * SPANS_PER_ROW_MOBILE + colStart
        : (rowNumber - 1) * SPANS_PER_ROW_TABLET_UP + colStart,
      span: 1,
      gridArea: `${rowNumber} / ${colStart} / ${rowNumber + 1} / ${colEnd}`,
      item: row,
      type: row.type,
    };
  });

  const doubleTilePositions = doubleTiles.map((row, index) => {
    const realIndex = index + 1;
    const rowNumber = realIndex * ROW_GAP_BETWEEN_CONTENT_TILES;
    const colStart = isMobile ? 1 : realIndex % 2 === 0 ? 2 : 1;
    const colEnd = isMobile ? 3 : realIndex % 2 === 0 ? 4 : 3;

    return {
      position: isMobile ? (rowNumber - 1) * 2 + colStart : (rowNumber - 1) * 3 + colStart,
      span: 2,
      gridArea: `${rowNumber} / ${colStart} / ${rowNumber + 1} / ${colEnd}`,
      item: row,
      type: row.type,
    };
  });

  const allTiles = mixAndMerge(singleTilePositions, doubleTilePositions);
  const allTilesLookup = allTiles.reduce(
    (acc, current) => ({
      ...acc,
      [current.position]: current,
    }),
    {},
  );

  const TOTAL_CONTENT_TILE_SPAN = allTiles.reduce((acc, current) => acc + current.span, 0);

  const tilePositionMap = range(1, TOTAL_CONTENT_TILE_SPAN + productCount + 3).reduce((acc, position) => {
    const tileAtThisPosition = allTilesLookup[position];
    const tileAtPrevPosition = allTilesLookup[position - 1];
    return [
      ...acc,
      {
        position,
        span: tileAtThisPosition ? tileAtThisPosition.span : 1,
        isProduct: tileAtThisPosition ? false : tileAtPrevPosition && tileAtPrevPosition.span === 2 ? false : true,
      },
    ];
  }, []);

  const tilePositionLookup = tilePositionMap.reduce(
    (acc, current) => ({
      ...acc,
      [current.position]: current,
    }),
    {},
  );

  const productOnly = tilePositionMap.filter(({ isProduct }) => isProduct);
  const lastProductActualPosition = productOnly[productCount - 1].position;

  const lastProductVirtualPosition = isMobile
    ? Math.ceil(lastProductActualPosition / 2) * SPANS_PER_ROW_MOBILE
    : Math.ceil(lastProductActualPosition / 3) * SPANS_PER_ROW_TABLET_UP;

  // tslint:disable cyclomatic-complexity prefer-conditional-expression
  /**
   * This closure calculates the amount of SPANS that need to be added/removed from the last row of products
   * Depending on the position of the last element and the possible Content tile in the very next position,
   * 1 or 2 spans can be added or removed based on the availability of Content Tiles and Product Tiles
   */
  const productPositionOffset = (() => {
    const tileAtNextPosition = tilePositionLookup[lastProductActualPosition + 1];
    if (isLastPage) {
      return 0;
    }
    if (isMobile) {
      if (lastProductActualPosition % SPANS_PER_ROW_MOBILE === 0) {
        return 0;
      } else if (lastProductActualPosition % SPANS_PER_ROW_MOBILE === 1) {
        if (!tileAtNextPosition.isProduct && tileAtNextPosition.span === 1) {
          return +1;
        } else {
          return -1;
        }
      }
    } else {
      if (lastProductActualPosition % SPANS_PER_ROW_TABLET_UP === 0) {
        return 0;
      } else if (lastProductActualPosition % SPANS_PER_ROW_TABLET_UP === 1) {
        if (!tileAtNextPosition.isProduct && tileAtNextPosition.span === 2) {
          return +2;
        } else {
          return -1;
        }
      } else if (lastProductActualPosition % SPANS_PER_ROW_TABLET_UP === 2) {
        if (!tileAtNextPosition.isProduct && tileAtNextPosition.span === 1) {
          return +1;
        } else {
          return -2;
        }
      }
    }
  })();

  const tilesWithinLastPlacedProduct = allTiles.filter(({ position }) => position <= lastProductVirtualPosition);

  return {
    tiles: tilesWithinLastPlacedProduct,
    productsToDisplay: productPositionOffset < 0 ? productCount + productPositionOffset : productCount,
  };
};
