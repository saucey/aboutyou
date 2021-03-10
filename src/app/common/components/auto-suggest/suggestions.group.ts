import { Suggestion } from 'src/app/common/components/auto-suggest/suggestion';

export interface SuggestionsGroup {
  suggestionGroupName: string;
  suggestions: Suggestion[];
}
