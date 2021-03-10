import { BasketPackageInformation } from '@aboutyou/backbone/endpoints/basket/getBasket';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslateTestingModule } from 'src/tests/fixtures/translate-testing.module';

import { BasketPackageInfoComponent } from './basket-package-info.component';

describe('BasketPackageInfoComponent', () => {
  let component: BasketPackageInfoComponent;
  let fixture: ComponentFixture<BasketPackageInfoComponent>;
  let mockedPackageInfo: BasketPackageInformation;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BasketPackageInfoComponent],
      imports: [TranslateTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketPackageInfoComponent);
    component = fixture.componentInstance;
    mockedPackageInfo = {
      carrierKey: 'HERMES',
      id: 123,
      deliveryDate: { max: '2020-02-23', min: '2020-02-20' },
    };
    component.minDeliveryDate = mockedPackageInfo.deliveryDate.min;
    component.maxDeliveryDate = mockedPackageInfo.deliveryDate.max;
    component.carrierKey = mockedPackageInfo.carrierKey;
    component.packageIndex = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('carrierKey', () => {
    it('should render app-icon for carrierKey', () => {
      component.carrierKey = 'HERMES';
      fixture.detectChanges();
      const appIconHermes = fixture.debugElement.query(By.css('app-icon.carrier-icon[icon=hermes]'));
      expect(component.mappedIcon).toEqual('hermes');
      expect(appIconHermes).toBeDefined();
    });

    it('should map app-icon for carrierKey DHL_WELTPAKET to dhl', () => {
      component.carrierKey = 'DHL_WELTPAKET';
      fixture.detectChanges();
      const appIconDHL = fixture.debugElement.query(By.css('app-icon.carrier-icon[icon=dhl]'));
      expect(component.mappedIcon).toEqual('dhl');
      expect(appIconDHL).toBeDefined();
    });

    it('should not render app-icon for carrierKey', () => {
      component.carrierKey = null;
      fixture.detectChanges();
      const nullAppIcon = fixture.debugElement.query(By.css('.carrier-icon'));
      expect(component.mappedIcon).toBeNull();
      expect(nullAppIcon).toBeNull();
    });
    it('should not render app-icon for unknown carrierKey', () => {
      component.carrierKey = 'SOME_STRANGE_KEY';
      fixture.detectChanges();
      const nullAppIcon = fixture.debugElement.query(By.css('.carrier-icon'));
      expect(component.mappedIcon).toBeUndefined();
      expect(nullAppIcon).toBeNull();
    });
  });

  describe('deliveryDate', () => {
    it('should render the short delivery-date', () => {
      const deliveryDateSpanElement = fixture.debugElement.query(By.css('.delivery-date'))
        .nativeElement as HTMLSpanElement;
      expect(deliveryDateSpanElement.textContent).toEqual('20.02.\xA0-\xA023.02.');
    });

    it('should render the delivery-date in format given', () => {
      component.dateFormat = 'EE dd.MM.';
      fixture.detectChanges();
      const deliveryDateSpanElement = fixture.debugElement.query(By.css('.delivery-date'))
        .nativeElement as HTMLSpanElement;
      expect(deliveryDateSpanElement.textContent).toEqual('Thu 20.02.\xA0-\xA0Sun 23.02.');
    });
  });

  it('should render the delivery-label', () => {
    const appIconHermes = fixture.debugElement.query(By.css('.delivery-label')).nativeElement as HTMLSpanElement;
    expect(appIconHermes.textContent).toEqual('BASKET.listHeader.labelGroupedByPackage');
  });
});
