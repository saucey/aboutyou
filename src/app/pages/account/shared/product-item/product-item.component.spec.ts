/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductItemComponent } from './product-item.component';
import { orders } from 'src/tests/mocks/orders-mock';
import { MaterialModule } from 'src/app/common/material.module';
import { EnergyFlagComponent } from 'src/app/common/components/energy-flag/energy-flag.component';
import { RouterTestingWithLocalizationModule } from 'src/tests/fixtures/router-testing-with-localization.module';

describe('ProductItemComponent', () => {
  let component: ProductItemComponent;
  let fixture: ComponentFixture<ProductItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductItemComponent, EnergyFlagComponent],
      imports: [MaterialModule, RouterTestingWithLocalizationModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.product = orders[0];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should double amount of unitprice', () => {
    expect(component.sumAmountUnitPrice()).toEqual(400);
  });

  it('should double amount of oldPrice', () => {
    expect(component.sumAmountOldPrice()).toEqual(800);
  });

  it('should double amount of discountprice', () => {
    expect(component.sumAmountDiscountPrice()).toEqual(600);
  });
});
