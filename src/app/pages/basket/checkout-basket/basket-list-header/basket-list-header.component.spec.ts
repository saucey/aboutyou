import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TextComponent } from 'src/app/common/components/text/text.component';

import { BasketListHeaderComponent } from './basket-list-header.component';
import { TranslateTestingModule } from 'src/tests/fixtures/translate-testing.module';

describe('BasketListHeaderComponent', () => {
  let component: BasketListHeaderComponent;
  let fixture: ComponentFixture<BasketListHeaderComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslateTestingModule],
      declarations: [BasketListHeaderComponent, TextComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketListHeaderComponent);
    component = fixture.componentInstance;
    component.basketItemsLength = 3;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('.header .info .label', () => {
    it('should render h5 text', () => {
      const h5DebugElement = debugElement.query(By.css('h5'));
      expect(h5DebugElement).toBeDefined();
    });

    it('should render textContent', () => {
      const textComponentDebugElement = debugElement.query(By.css('h5'));
      const text = (textComponentDebugElement.nativeElement as HTMLElement).textContent;
      expect(text).toContain('BASKET.listHeader.label');
    });

    it('should not render h5 if showTitle = false', () => {
      component.showTitle = false;
      fixture.detectChanges();
      const textComponentDebugElement = debugElement.query(By.css('h5'));
      expect(textComponentDebugElement).toBeNull();
    });
  });

  it('should render itemCount', () => {
    const itemCountLabel: HTMLSpanElement = debugElement.query(By.css('.item-count-label')).nativeElement;
    expect(itemCountLabel.textContent).toContain('BASKET.listHeader.itemCount');
  });
});
