import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BasketService } from 'src/app/core/basket';
import { CONFIG_TOKEN } from 'src/app/core/config.provider';
import { NgrxTestingModule } from 'src/tests/fixtures/ngrx-testing.module';
import { RouterTestingWithLocalizationModule } from 'src/tests/fixtures/router-testing-with-localization.module';
import { ReservationBasketService } from '../../../core/reservation-basket';
import { ReservationBasketComponent } from './reservation-basket.component';
import { ReservationBasketModule } from './reservation-basket.module';

describe('ReservationBasketComponent', () => {
  let component: ReservationBasketComponent;
  let fixture: ComponentFixture<ReservationBasketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReservationBasketModule, RouterTestingWithLocalizationModule, NgrxTestingModule],
      providers: [
        {
          provide: ReservationBasketService,
          useValue: jasmine.createSpyObj<BasketService>('ReservationBasketService', ['onAppStable']),
        },
        { provide: CONFIG_TOKEN, useValue: { basket: { groupByPackage: true } } },
      ],
    });
  }));

  beforeEach(() => {
    initComponent();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  function initComponent() {
    fixture = TestBed.createComponent(ReservationBasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }
});
