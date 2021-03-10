import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { InlineSVGModule } from 'ng-inline-svg';
import { IconComponent } from '../icon/icon.component';
import { QuantityPickerComponent } from './quantity-picker.component';

describe('QuantityPickerComponent', () => {
  let component: QuantityPickerComponent;
  let fixture: ComponentFixture<QuantityPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, InlineSVGModule.forRoot()],
      declarations: [IconComponent, QuantityPickerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantityPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increase value by 1', () => {
    component.value = 1;

    // tslint:disable-next-line: no-string-literal
    component['inputEmitter'].subscribe(value => {
      expect(value).toBe(2);
    });

    component.increment();
  });

  it('should emit limit when value is greater than limit', () => {
    component.value = 3;
    component.limit = 1;

    component.valueChange.subscribe(value => {
      expect(value).toBe(1);
    });

    component.increment();
  });

  it('should emit limit when value is less or equal to limit', () => {
    component.value = 1;
    component.limit = 3;

    component.valueChange.subscribe(value => {
      expect(value).toBe(2);
    });

    component.increment();
  });

  it('should show 0 if target is empty', async () => {
    const input = fixture.debugElement.nativeElement.querySelector('input');
    input.value = '';

    const inputEvent = new Event('input');
    input.dispatchEvent(inputEvent);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(input.value).toBe('0');
    });
  });

  it('should only allow numbers', async () => {
    const input = fixture.debugElement.nativeElement.querySelector('input');
    input.value = 'four';

    const inputEvent = new Event('input');
    input.dispatchEvent(inputEvent);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(input.value).not.toBe('four');
    });
  });

  it('should not allow input above limit', async () => {
    component.limit = 2;
    const input = fixture.debugElement.nativeElement.querySelector('input');
    input.value = '2';

    const inputEvent = new Event('input');
    input.dispatchEvent(inputEvent);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(input.value).toBe('2');
    });
  });

  it('should not decrease quantity below 1', fakeAsync(() => {
    component.value = 1;

    fixture.detectChanges();
    let result = -1;
    component.valueChange.subscribe(value => (result = value));

    const button = fixture.debugElement.query(By.css('.decrement'));
    button.triggerEventHandler('click', new MouseEvent('click'));

    tick(60);

    expect(result).toBe(1);
  }));

  it('should not emit a greater value than its limit on increment click', fakeAsync(() => {
    component.value = 15;
    component.limit = 15;

    fixture.detectChanges();

    let result = -1;

    component.valueChange.subscribe(value => (result = value));

    const button = fixture.debugElement.query(By.css('.increment'));
    button.triggerEventHandler('click', new MouseEvent('click'));
    tick(60);

    expect(result).toBe(15);
  }));
});
