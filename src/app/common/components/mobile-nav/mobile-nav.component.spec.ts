import { createMouseEvent } from '@angular/cdk/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NavbarCategory } from 'src/app/core/shop/types';
import { transformNavTree } from 'src/app/core/shop/utils';
import { FIXTURE_CATEGORIES } from 'src/tests/fixtures/categories';
import { LocalizeRouterPipeMock } from 'src/tests/fixtures/localize.mock.pipe';
import { MobileNavComponent } from './mobile-nav.component';

describe('MobileNavComponent', () => {
  let navbarCategories: NavbarCategory[];
  let component: MobileNavComponent;
  let fixture: ComponentFixture<MobileNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MobileNavComponent, LocalizeRouterPipeMock],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    navbarCategories = transformNavTree(FIXTURE_CATEGORIES);
    fixture = TestBed.createComponent(MobileNavComponent);
    component = fixture.componentInstance;
    component.items = navbarCategories;
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should render all root categories', () => {
    const childRows = fixture.debugElement.queryAll(By.css('.child-row'));
    expect(childRows.length).toEqual(navbarCategories.length);
  });

  it('should set selectedItem when clicking a category', () => {
    const childRows = fixture.debugElement.queryAll(By.css('.child-row'));
    childRows[0].query(By.css('.child-link')).triggerEventHandler('click', createMouseEvent('click'));
    fixture.detectChanges();
    expect(component.selectedItem.id).toEqual(navbarCategories[0].id);
  });

  it('should go back to parent category and to the root', () => {
    component.activeCategory = navbarCategories[0];
    component.onSelect = () => ({});
    fixture.detectChanges();

    const firstChild = fixture.debugElement.query(By.css('.child-link'));
    firstChild.triggerEventHandler('click', createMouseEvent('click'));
    fixture.detectChanges();

    expect(component.selectedItem.id).toEqual(navbarCategories[0].id);

    const nextChild = fixture.debugElement.queryAll(By.css('.child-link'))[1];
    nextChild.triggerEventHandler('click', createMouseEvent('click'));
    fixture.detectChanges();

    const parentLink = fixture.debugElement.query(By.css('.parent-link'));
    expect(parentLink).toBeTruthy();
    parentLink.triggerEventHandler('click', createMouseEvent('click'));
    fixture.detectChanges();

    const resetLink = fixture.debugElement.query(By.css('.parent-link'));
    expect(resetLink).toBeTruthy();
    resetLink.triggerEventHandler('click', createMouseEvent('click'));

    fixture.detectChanges();
    expect(component.selectedItem).toEqual(undefined);
  });
});
