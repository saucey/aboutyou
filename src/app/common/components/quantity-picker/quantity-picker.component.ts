import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-quantity-picker',
  templateUrl: './quantity-picker.component.html',
  styleUrls: ['./quantity-picker.component.scss'],
})
export class QuantityPickerComponent implements OnInit, OnDestroy, OnChanges {
  private inputEmitter: Subject<number> = new Subject();

  @Input() editable = true;
  @Input() disabled: boolean;
  @Input() value: number;
  @Input() limit = Infinity;
  @Output() valueChange: EventEmitter<number> = new EventEmitter();

  ngOnInit() {
    this.inputEmitter.pipe(debounceTime(50)).subscribe(nextValue => {
      this.valueChange.emit(Math.max(1, Math.min(this.limit, nextValue)));
    });
  }

  ngOnDestroy() {
    this.inputEmitter.unsubscribe();
  }

  decrement() {
    this.inputEmitter.next(this.value - 1);
  }

  increment() {
    this.inputEmitter.next(this.value + 1);
  }

  handleInputChange(event: Event) {
    const target = event.target as HTMLInputElement;

    // Only allow numbers
    if (!/^[0-9]*$/.test(target.value)) {
      target.value = target.value.replace(/[^0-9]/g, '');
      event.preventDefault();
    }

    // Don't allow to input above limit
    if (this.limit > 0 && Number(target.value) > this.limit) {
      target.value = String(this.limit);
      event.preventDefault();
    }

    // Show 0 if target is empty
    if (target.value === '') {
      target.value = '0';
    }

    this.inputEmitter.next(Number(target.value)); // Passing as Number strictly since event carries string
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isValueAboveLimit(changes.limit)) {
      this.value = 1;
    }
  }

  private isValueAboveLimit(limit: SimpleChange): boolean {
    return limit && !limit.firstChange && this.value > limit.currentValue;
  }
}
