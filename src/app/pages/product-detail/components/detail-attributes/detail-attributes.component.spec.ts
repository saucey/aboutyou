import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BapiProductService } from 'src/app/core/services/bapi/bapi-product.service';
import { mockPipe } from 'src/tests/mocks/pipes.mock';
import { DetailAttributesComponent } from './detail-attributes.component';
import { DetailAttributesComponentPageObj } from './detail-attributes.component.po';

describe('DetailAttributesComponent', () => {
  let component: DetailAttributesComponent;
  let fixture: ComponentFixture<DetailAttributesComponent>;
  let pageObject: DetailAttributesComponentPageObj;

  function getMinimalProduct(): any {
    return { custom: {} } as any;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailAttributesComponent, mockPipe({ name: 'translate' })],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: BapiProductService,
          useValue: jasmine.createSpyObj('BapiProductService', ['query']),
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailAttributesComponent);
    pageObject = new DetailAttributesComponentPageObj(fixture);
    component = fixture.componentInstance;
    component.product = getMinimalProduct();
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
});
