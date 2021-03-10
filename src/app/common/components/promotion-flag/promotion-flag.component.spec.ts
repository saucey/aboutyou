/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PromotionFlagComponent } from './promotion-flag.component';
import { GlobalModule } from 'src/app/common/global.module';

describe('PromotionFlagComponent', () => {
  let component: PromotionFlagComponent;
  let fixture: ComponentFixture<PromotionFlagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [GlobalModule],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionFlagComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('should set icon to sale', () => {
    component.type = 'sale';
    component.mapType();

    expect(component.icon).toBe('label-sale');
  });
  it('should set icon to new', () => {
    component.type = 'new';
    component.mapType();

    expect(component.icon).toBe('label-new');
  });
});
