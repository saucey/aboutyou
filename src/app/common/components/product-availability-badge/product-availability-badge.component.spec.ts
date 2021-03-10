/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductAvailabilityBadgeComponent } from './product-availability-badge.component';
import { GlobalModule } from 'src/app/common/global.module';

describe('ProductAvailabilityBadgeComponent', () => {
  let component: ProductAvailabilityBadgeComponent;
  let fixture: ComponentFixture<ProductAvailabilityBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [GlobalModule],
    }).compileComponents();
  }));

  it('should create', () => {
    fixture = TestBed.createComponent(ProductAvailabilityBadgeComponent);
    component = fixture.componentInstance;
    component.type = 'available';
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
