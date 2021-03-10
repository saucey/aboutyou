import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { GlobalModule } from 'src/app/common/global.module';
import { RouterTestingWithLocalizationModule } from 'src/tests/fixtures/router-testing-with-localization.module';
import { ReservationsListComponent } from './reservations-list.component';
import { OrdersListItemComponent } from '../../shared/list-item/orders-list-item.component';
import { PaginationComponent } from '../../shared/pagination/pagination.component';

describe('ReservationsListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingWithLocalizationModule, GlobalModule],
      declarations: [ReservationsListComponent, OrdersListItemComponent, PaginationComponent],
    }).compileComponents();
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(ReservationsListComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
