import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { By } from '@angular/platform-browser';
import { TranslateTestingModule } from 'src/tests/fixtures/translate-testing.module';
import { IconComponent } from '../icon/icon.component';
import { BasketBottomSheetData } from './basket-bottom-sheet-data';
import { BasketBottomSheetResult } from './basket-bottom-sheet-result';
import { BasketBottomSheetComponent } from './basket-bottom-sheet.component';
import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;

describe('BasketBottomSheetComponent', () => {
  let component: BasketBottomSheetComponent;
  let fixture: ComponentFixture<BasketBottomSheetComponent>;
  let matBottomSheetRef: SpyObj<MatBottomSheetRef>;
  let data: BasketBottomSheetData;

  beforeEach(async(() => {
    data = { productTitle: 'testTitle' };

    TestBed.configureTestingModule({
      declarations: [BasketBottomSheetComponent, IconComponent],
      imports: [TranslateTestingModule],
      providers: [
        { provide: MatBottomSheetRef, useValue: createSpyObj<MatBottomSheetRef>('bottomSheetRef', ['dismiss']) },
        { provide: MAT_BOTTOM_SHEET_DATA, useValue: data },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    matBottomSheetRef = TestBed.get(MatBottomSheetRef);
    fixture = TestBed.createComponent(BasketBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('component logic', () => {
    it('should dismiss with BasketBottomSheetResult.DELETE_ARTICLE when #deleteItem is called', () => {
      component.deleteItem();
      expect(matBottomSheetRef.dismiss).toHaveBeenCalledWith(BasketBottomSheetResult.DELETE_ARTICLE);
    });

    it('should dismiss with BasketBottomSheetResult.ADD_ARTICLE when #addItem is called', () => {
      component.addItem();
      expect(matBottomSheetRef.dismiss).toHaveBeenCalledWith(BasketBottomSheetResult.ADD_ARTICLE);
    });

    it('should dismiss with BasketBottomSheetResult.CANCEL when the #cancel is called', () => {
      component.cancel();
      expect(matBottomSheetRef.dismiss).toHaveBeenCalledWith(BasketBottomSheetResult.CANCEL);
    });
  });

  describe('rendered content and logic', () => {
    it('should render the productTitle', () => {
      const title: DebugElement = fixture.debugElement.query(By.css('.title'));
      expect(title.nativeElement.textContent).toEqual(data.productTitle);
    });

    it('should dismiss with BasketBottomSheetResult.DELETE_ARTICLE when delete button is clicked', () => {
      const deleteButton: DebugElement = fixture.debugElement.query(By.css('#delete-button-wrapper'));
      deleteButton.triggerEventHandler('click', null);
      expect(matBottomSheetRef.dismiss).toHaveBeenCalledWith(BasketBottomSheetResult.DELETE_ARTICLE);
    });

    it('should dismiss with BasketBottomSheetResult.ADD_ARTICLE when add button is clicked', () => {
      const addButton = fixture.debugElement.nativeElement.querySelector('#add-button-wrapper');
      addButton.click();
      expect(matBottomSheetRef.dismiss).toHaveBeenCalledWith(BasketBottomSheetResult.ADD_ARTICLE);
    });

    it('should dismiss with BasketBottomSheetResult.CANCEL when the close icon is clicked', () => {
      const cancelIcon = fixture.debugElement.nativeElement.querySelector('.icon-link');
      cancelIcon.click();
      expect(matBottomSheetRef.dismiss).toHaveBeenCalledWith(BasketBottomSheetResult.CANCEL);
    });
  });
});
