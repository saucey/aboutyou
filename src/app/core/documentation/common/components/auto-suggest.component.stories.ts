import { withKnobs, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';
import { includeModuleMetadata } from 'src/app/core/shop/utils';
import { SuggestionsGroup } from 'src/app/common/components/auto-suggest/suggestions.group';
import { GlobalModule } from 'src/app/common/global.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { action } from '@storybook/addon-actions';
import { of, Observable } from 'rxjs';
import { AutoSuggestComponent } from 'src/app/common/components/auto-suggest/auto-suggest.component';

export const SUGGESTIONS_LOOKUP = (value: string): Observable<SuggestionsGroup[]> => {
  return of([
    {
      suggestionGroupName: 'Products',
      suggestions: [
        {
          mainText: 'Products Name 1',
          boldText: '10',
          link: '/somelink',
          image: 'https://depot.dam.staging.aboutyou.cloud/images//images/3b628b4c2966d4170d95c845a5de6775',
        },
        {
          mainText: 'Products Name 2',
          boldText: '100',
          link: '/somelink',
          image: 'https://depot.dam.staging.aboutyou.cloud/images//images/3b628b4c2966d4170d95c845a5de6775',
        },
      ],
    },
    {
      suggestionGroupName: 'Categories',
      suggestions: [
        { mainText: 'Category 1', link: '/somelink' },
        { mainText: 'Category 2', link: '/somelink' },
      ],
    },
  ]);
};

storiesOf('Components|Autosuggest', module)
  .addParameters({ component: AutoSuggestComponent })
  .addDecorator(withKnobs)
  .add('default', () => {
    return {
      template: `
        <app-auto-suggest
          [placeholder]="placeholder"
          [minSearchTermLength]="3"
          (suggestionsLookup)="suggestionsLookup($event)"
          [suggestionsGroupOptions]="suggestionGroupOption"
          (suggestionSelect)="onSuggestionSelect($event)"
          (searchSubmit)="onSearchSubmit($event)"
        ></app-auto-suggest>
      `,
      props: {
        suggestionSelect: action('onSuggestionSelect'),
        searchSubmit: action('onSearchSubmit'),
        placeholder: text('placeholder', 'placeholder'),
        suggestionGroupOptions: SUGGESTIONS_LOOKUP(''),
        suggestionsLookup: SUGGESTIONS_LOOKUP,
      },
      ...includeModuleMetadata([], [GlobalModule, BrowserAnimationsModule]),
    };
  });
