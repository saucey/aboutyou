interface ISearchSuggestionsConfig {
  minSearchTermLength: number;
  productsToDisplay: number;
  categoriesToDisplay: number;
}

export interface ISearchConfig {
  suggestions: ISearchSuggestionsConfig;
}

export const search: ISearchConfig = {
  suggestions: {
    minSearchTermLength: 3,
    productsToDisplay: 5,
    categoriesToDisplay: 5,
  },
};
