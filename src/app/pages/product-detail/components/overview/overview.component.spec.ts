import { BasketService } from 'src/app/core/basket';
import { mockPipe } from 'src/tests/mocks/pipes.mock';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewComponent } from './overview.component';
import { OverviewComponentPageObj } from './overview.component.po';

import createSpyObj = jasmine.createSpyObj;

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;
  let pageObject: OverviewComponentPageObj;

  function getMinimalProduct(): any {
    return { custom: {}, entity: { variants: [{ id: 123 }] } } as any;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OverviewComponent, mockPipe({ name: 'translate' }), mockPipe({ name: 'localize' })],
      providers: [
        {
          provide: BasketService,
          useValue: createSpyObj<BasketService>('BasketService', ['getCheckoutCustomDataForDisplayProduct']),
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewComponent);
    pageObject = new OverviewComponentPageObj(fixture);
    component = fixture.componentInstance;
    component.product = getMinimalProduct();
    component.ngOnChanges();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hide the variantNotSelectableInfo if unavailable', () => {
    expect(pageObject.getVariantNotSelectableInfoElem()).toBeNull();
  });

  it('should display the variantNotSelectableInfo if available', () => {
    component.product.custom.variantNotSelectableInfo = 'something';
    fixture.detectChanges();

    expect(pageObject.getVariantNotSelectableInfo()).toContain('something');
  });

  it('should display the clickAndReserve button', () => {
    expect(pageObject.getClickAndReserveButton()).toBeDefined();
  });
});
