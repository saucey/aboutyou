import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NgrxTestingModule } from 'src/tests/fixtures/ngrx-testing.module';
import { RouterTestingWithLocalizationModule } from 'src/tests/fixtures/router-testing-with-localization.module';
import { OrdersPageComponent } from './orders-page.component';
import { AccountModule } from '../account.module';
import { CookieService } from 'ngx-cookie-service';

describe('OrdersPageComponent', () => {
  let component: OrdersPageComponent;
  let fixture: ComponentFixture<OrdersPageComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AccountModule, RouterTestingWithLocalizationModule, NgrxTestingModule],
      providers: [CookieService],
    });
  }));

  beforeEach(() => {
    initComponent();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  function initComponent() {
    httpTestingController = TestBed.get(HttpTestingController);
    fixture = TestBed.createComponent(OrdersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }
});
