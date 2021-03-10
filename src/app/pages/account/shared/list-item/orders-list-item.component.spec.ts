import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { GlobalModule } from 'src/app/common/global.module';
import { RouterTestingWithLocalizationModule } from 'src/tests/fixtures/router-testing-with-localization.module';
import { OrdersListItemComponent } from './orders-list-item.component';

describe('OrdersListItemComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingWithLocalizationModule, GlobalModule],
      declarations: [OrdersListItemComponent],
    }).compileComponents();
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(OrdersListItemComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
