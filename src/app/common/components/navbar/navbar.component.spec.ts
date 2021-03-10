import { createMouseEvent } from '@angular/cdk/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarCategory } from 'src/app/core/shop/types';
import { transformNavTree } from 'src/app/core/shop/utils';
import { FIXTURE_CATEGORIES } from 'src/tests/fixtures/categories';
import { LocalizeRouterPipeMock } from 'src/tests/fixtures/localize.mock.pipe';
import { NavbarComponent } from './navbar.component';
import createSpy = jasmine.createSpy;

describe('NavbarComponent', () => {
  let navbarCategories: NavbarCategory[];

  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent, LocalizeRouterPipeMock],
      imports: [NoopAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    navbarCategories = transformNavTree(FIXTURE_CATEGORIES);
    component.items = navbarCategories;
    fixture.detectChanges();
  }));

  it('should open flyout when mouseenter any main category', () => {
    const mainItems = fixture.debugElement.queryAll(By.css('.main-item'));
    expect(mainItems.length).toEqual(5);
    const flyout = fixture.debugElement.query(By.css('.flyout'));
    expect(flyout).toEqual(null);

    mainItems[0].triggerEventHandler('mouseenter', createMouseEvent('mouseenter'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const flyout2 = fixture.debugElement.query(By.css('.flyout'));
      expect(flyout2).toBeDefined();
    });
  });

  it('should call onCategoryClick on click on links', () => {
    component.onCategoryClick = createSpy('onCategoryClick');
    fixture.detectChanges();

    const mainItem = fixture.debugElement.query(By.css('.main-item'));
    mainItem.nativeElement.click();
    fixture.detectChanges();

    expect(component.onCategoryClick).toHaveBeenCalled();
  });

  it('should set menuOpen when mouse enter and leave the host', () => {
    fixture.detectChanges();

    expect(component.menuOpen).toEqual(undefined);

    fixture.debugElement.triggerEventHandler('mouseenter', createMouseEvent('mouseenter'));
    fixture.detectChanges();

    expect(component.menuOpen).toEqual(true);

    fixture.debugElement.triggerEventHandler('mouseleave', createMouseEvent('mouseleave'));
    fixture.detectChanges();

    expect(component.menuOpen).toEqual(false);
  });
});
