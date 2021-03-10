import { ProductImage } from '@aboutyou/backbone';
import map from 'ramda/es/map';
import pipe from 'ramda/es/pipe';
import split from 'ramda/es/split';
import toLower from 'ramda/es/toLower';
import trim from 'ramda/es/trim';
import reject from 'ramda/es/reject';

const hasAttributeValue = tagValue => image =>
  image.attributes.imageTags && image.attributes.imageTags.values.filter(({ value }) => value === tagValue).length > 0;

const getImagesByTagValue = (images: ProductImage[], tagValue: string): ProductImage[] => {
  return images.filter(hasAttributeValue(tagValue));
};

const getImageBySeasonValue = (images: ProductImage[], seasonValue: string): ProductImage => {
  const seasonValues = pipe(split(', '), map(trim), map(toLower))(seasonValue);
  return images.find(
    image =>
      image.attributes.imageSeason &&
      image.attributes.imageSeason.values.filter(({ value }: { value: string }) =>
        seasonValues.includes(value.toLowerCase()),
      ).length > 0,
  );
};

const getImagesWithoutAnySeasonAttribute = (images: ProductImage[]): ProductImage[] => {
  return reject((image: ProductImage) => Boolean(image.attributes.imageSeason))(images);
};

/**
 * This method should find the mood image based on a season value.
 * Logic:
 * > try to find a image which has a mood tag and has the same season as the current category
 * > If successful in finding one, return it.
 * > If not successful in finding one, then return a mood image without any season property
 * > If successful in finding one, return it.
 * > If not successful return undefined. We don't have a mood image!
 */
export const getDisplayMoodImage = (images: ProductImage[], seasonValue: string): ProductImage => {
  const moodImages = getImagesByTagValue(images, 'mood');
  const seasonImage = getImageBySeasonValue(moodImages, seasonValue);
  if (seasonImage) {
    return seasonImage;
  }
  const moodImagesWithoutAnySeason = getImagesWithoutAnySeasonAttribute(moodImages);
  return moodImagesWithoutAnySeason.length && moodImagesWithoutAnySeason[0];
};
