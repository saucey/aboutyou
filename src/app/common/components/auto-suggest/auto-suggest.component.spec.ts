import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { GlobalModule } from 'src/app/common/global.module';
import { AutoSuggestComponent } from './auto-suggest.component';
import Spy = jasmine.Spy;

describe('AutoSuggestComponent', () => {
  let component: AutoSuggestComponent;
  let fixture: ComponentFixture<AutoSuggestComponent>;
  let inputElement: DebugElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [GlobalModule, NoopAnimationsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(AutoSuggestComponent);
    component = fixture.componentInstance;
    component.minSearchTermLength = 3;

    fixture.detectChanges();
    await fixture.whenStable();

    inputElement = fixture.debugElement.query(By.css('input'));
  });

  it('should should in init state', () => {
    const matPanel = document.querySelectorAll('mat-autocomplete-panel');
    expect(component).toBeDefined();
    expect(matPanel.length).toEqual(0);
  });

  it('should submit the user input, when enter button is clicked', async () => {
    const spy: Spy = spyOn(component, 'onSubmitSearch');

    inputElement = fixture.debugElement.query(By.css('input'));
    inputElement.nativeElement.value = 'Products';
    inputElement.nativeElement.dispatchEvent(new Event('input'));
    inputElement.triggerEventHandler('keydown.enter', {
      target: {
        blur: () => {
          return;
        },
      },
    });

    fixture.detectChanges();
    await fixture.whenStable();

    expect(spy).toHaveBeenCalled();
    expect(component.searchForm.get('autoCompleteInput').value).toBe('Products');
  });

  it('should pass value to search form, when inout is changed', async () => {
    inputElement = fixture.debugElement.query(By.css('input'));
    inputElement.nativeElement.value = 'Products';
    inputElement.nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.searchForm.get('autoCompleteInput').value).toBe('Products');
  });
});
