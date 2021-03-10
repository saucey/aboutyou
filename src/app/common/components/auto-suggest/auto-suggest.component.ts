import {
  Component,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { ICurrency } from 'src/app/core/shop/types';
import { Suggestion } from 'src/app/common/components/auto-suggest/suggestion';
import { SuggestionsGroup } from 'src/app/common/components/auto-suggest/suggestions.group';
import { Subscription } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';

/**
 * The `AutoSuggestComponent` component is used for the Search functionality with dynamic suggestions (Products, Categories etc).
 */
@Component({
  selector: 'app-auto-suggest',
  templateUrl: 'auto-suggest.component.html',
  styleUrls: ['auto-suggest.component.scss'],
})
export class AutoSuggestComponent implements OnInit, OnDestroy {
  /** Search input placeholder text */
  @Input() placeholder: string;
  /** Label for `view all` link */
  @Input() viewAllLabel: string;
  /** Minimum number of characters to type before showing the suggestions */
  @Input() minSearchTermLength: number;
  /**
   * To store the retrieved search suggestions
   */
  @Input() suggestionsGroupOptions: SuggestionsGroup[];
  /** Currency symbol  */
  @Input() currency: ICurrency;
  /** Output emits when a Suggestion from the dropdown is selected. */
  @Output() suggestionSelect: EventEmitter<Suggestion> = new EventEmitter<Suggestion>();
  /** Output emits when a enter key is pressed or the search Icon is clicked after entering a search term */
  @Output() searchSubmit: EventEmitter<string> = new EventEmitter<string>();
  /** Output emits when the search query changes. It is expected to update the suggestionsGroupOptions input  */
  @Output() suggestionsLookup: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Reference to Material autocomplete trigger
   * @ignore : ignore for documentation in storybook
   */
  @ViewChild('matAutocompleteTrigger', { read: MatAutocompleteTrigger, static: false })
  matAutocompleteTrigger: MatAutocompleteTrigger;

  /**
   * search form group
   * @ignore : ignore for documentation in storybook
   */
  searchForm: FormGroup = this.formBuilder.group({
    autoCompleteInput: '',
  });

  private searchFormSubscription: Subscription;

  /**
   * Handles window resize , for closing the dropdown when it happens
   * @ignore : ignore for documentation in storybook
   */
  @HostListener('window:resize', [])
  onResize() {
    this.matAutocompleteTrigger.closePanel();
  }

  constructor(@Inject(FormBuilder) private formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.searchFormSubscription = this.searchForm
      .get('autoCompleteInput')
      .valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        map(value => {
          if (value && value !== '' && value.length >= this.minSearchTermLength) {
            return value;
          }
          return null;
        }),
      )
      .subscribe(searchTerm => this.suggestionsLookup.next(searchTerm));
  }

  /**
   * Handles Selection Change
   * @ignore : ignore for documentation in storybook
   */
  public onSelectionChange(selected: Suggestion): void {
    this.suggestionSelect.next(selected);
  }

  /**
   * Handles clear search
   * @ignore : ignore for documentation in storybook
   */
  public clearSearch(): void {
    this.searchForm.get('autoCompleteInput').reset();
    this.matAutocompleteTrigger.closePanel();
  }

  /**
   * Handles search submit
   * @ignore : ignore for documentation in storybook
   */
  public onSubmitSearch(): void {
    const term = this.searchForm.get('autoCompleteInput').value;
    this.clearSearch();
    if (term) {
      this.searchSubmit.next(term);
    }
  }

  /**
   * Handles submit event
   * @ignore : ignore for documentation in storybook
   */
  public handleSubmit(event: Event): void {
    (event.target as HTMLInputElement).blur();
    this.matAutocompleteTrigger.closePanel();
    this.onSubmitSearch();
  }

  ngOnDestroy(): void {
    if (this.searchFormSubscription != null) {
      this.searchFormSubscription.unsubscribe();
    }
  }
}
