import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NgrxTestingModule } from 'src/tests/fixtures/ngrx-testing.module';
import { RouterTestingWithLocalizationModule } from 'src/tests/fixtures/router-testing-with-localization.module';
import { ReservationsPageComponent } from './reservations-page.component';
import { AccountModule } from '../account.module';
import { CookieService } from 'ngx-cookie-service';
import 'rxjs/add/observable/from';

describe('ReservationsPageComponent', () => {
  let component: ReservationsPageComponent;
  let fixture: ComponentFixture<ReservationsPageComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AccountModule, RouterTestingWithLocalizationModule, NgrxTestingModule],
      providers: [CookieService],
    }).compileComponents();

    httpTestingController = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    initComponent();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should call Get', () => {
    const req = httpTestingController.expectOne('/api/reservations');
    expect(req.request.method).toEqual('GET');
  });

  function initComponent() {
    httpTestingController = TestBed.get(HttpTestingController);
    fixture = TestBed.createComponent(ReservationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }
});
