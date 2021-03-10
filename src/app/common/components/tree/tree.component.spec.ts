import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { transformNavTree } from 'src/app/core/shop/utils';
import { FIXTURE_CATEGORIES } from 'src/tests/fixtures/categories';
import { LocalizeRouterPipeMock } from 'src/tests/fixtures/localize.mock.pipe';
import { TreeComponent } from './tree.component';
import createSpy = jasmine.createSpy;

describe('TreeComponent', () => {
  let component: TreeComponent;
  let fixture: ComponentFixture<TreeComponent>;
  let debugElem: DebugElement;
  let selectSpy: jasmine.Spy;
  let navbarCategories = transformNavTree(FIXTURE_CATEGORIES);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TreeComponent, LocalizeRouterPipeMock],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeComponent);
    component = fixture.componentInstance;
    navbarCategories = transformNavTree(FIXTURE_CATEGORIES);
    component.items = navbarCategories;
    component.activeCategory = navbarCategories[0].children[1];
    debugElem = fixture.debugElement;
    selectSpy = createSpy('select');
    component.selected.subscribe(selectSpy);
    fixture.detectChanges();
  });

  it('should create render all root categories', () => {
    expect(component).toBeTruthy();
    const childRows = debugElem.queryAll(By.css('.child-link'));
    expect(childRows.length).toEqual(2);
  });

  it('should call onSelect when clicked', () => {
    component.activeCategory = navbarCategories[0];
    fixture.detectChanges();

    const firstChild = debugElem.query(By.css('.child-link'));
    firstChild.triggerEventHandler('click', new MouseEvent('click'));
    expect(selectSpy).toHaveBeenCalled();
  });

  it('should call select when parent clicked', () => {
    component.activeCategory = navbarCategories[0].children[0];
    fixture.detectChanges();

    const parentLink = debugElem.query(By.css('.parent-link'));
    parentLink.triggerEventHandler('click', new MouseEvent('click'));
    expect(selectSpy).toHaveBeenCalled();
  });
});
