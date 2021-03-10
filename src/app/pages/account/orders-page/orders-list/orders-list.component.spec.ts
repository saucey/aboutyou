import { NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NgrxTestingModule } from 'src/tests/fixtures/ngrx-testing.module';
import { RouterTestingWithLocalizationModule } from 'src/tests/fixtures/router-testing-with-localization.module';
import { OrdersListComponent } from './orders-list.component';
import { AccountModule } from '../../account.module';
import { CookieService } from 'ngx-cookie-service';
import { mockPipe } from 'src/tests/mocks/pipes.mock';
import { Router } from '@angular/router';

describe('OrdersListComponent', () => {
  let component: OrdersListComponent;
  let fixture: ComponentFixture<OrdersListComponent>;
  let httpTestingController: HttpTestingController;
  let spyRouter;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [mockPipe({ name: 'translate' }), mockPipe({ name: 'localize' })],
      imports: [HttpClientTestingModule, AccountModule, RouterTestingWithLocalizationModule, NgrxTestingModule],
      providers: [CookieService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    httpTestingController = TestBed.get(HttpTestingController);
    fixture = TestBed.createComponent(OrdersListComponent);
    component = fixture.componentInstance;
    component.orders = [{}] as any;
    spyRouter = spyOn(TestBed.get(Router), 'navigate');
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should call the router on init', () => {
    expect(spyRouter).toHaveBeenCalledTimes(1);
  });

  it('should count onChanges the amount of orders', () => {
    component.ngOnChanges({
      orders: new SimpleChange(null, [{}] as any, true),
    });
    fixture.detectChanges();
    expect(component.ordersCount).toEqual(1);
  });
});
