import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GlobalModule } from 'src/app/common/global.module';
import { RouterTestingWithLocalizationModule } from 'src/tests/fixtures/router-testing-with-localization.module';
import { ReservationDetailComponent } from './reservation-detail.component';
import { CookieService } from 'ngx-cookie-service';
import { LazyGoogleMapsService } from '../../../../modules/location-reserve-dialog/lazy-google-maps.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AccountModule } from '../../account.module';
import { DatePipe } from '@angular/common';

describe('ReservationsDetailComponent', () => {
  let component: ReservationDetailComponent;
  let fixture: ComponentFixture<ReservationDetailComponent>;
  const datepipe: DatePipe = new DatePipe('de-DE');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingWithLocalizationModule,
        GlobalModule,
        NgbModule,
        NgxSkeletonLoaderModule,
        AccountModule,
      ],
      providers: [
        CookieService,
        LazyGoogleMapsService,
        DatePipe,
        { provide: 'mapsAPI', useValue: 'AIzaSyBEv1X-5NgxGv9f1XmebHiz0UAulBE4qPY' },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should add seven days to date (getFinalPickUpDay)', () => {
    const startDate = component.getFinalPickUpDay('2020-05-12T19:36:25+00:00');
    const endDate = datepipe.transform(startDate, 'dd.MM');
    fixture.detectChanges();
    expect(endDate).toBe('19.05');
  });
});
