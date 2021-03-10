import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NgrxTestingModule } from 'src/tests/fixtures/ngrx-testing.module';
import { RouterTestingWithLocalizationModule } from 'src/tests/fixtures/router-testing-with-localization.module';
import { PersonalDataPageComponent } from './personal-data-page.component';
import { AccountModule } from '../account.module';
import { CookieService } from 'ngx-cookie-service';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { AppState } from 'src/app/core/shop/store';
import { initialState } from 'src/app/core/shop/store/account/account.reducers';
import { GlobalModule } from 'src/app/common/global.module';

describe('PersonalDataPageComponent', () => {
  let store: MockStore<Pick<AppState, 'account'>>;
  let component: PersonalDataPageComponent;
  let fixture: ComponentFixture<PersonalDataPageComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AccountModule,
        RouterTestingWithLocalizationModule,
        NgrxTestingModule,
        GlobalModule,
      ],
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
    fixture = TestBed.createComponent(PersonalDataPageComponent);

    store = TestBed.get(Store);
    store.setState({
      account: {
        ...initialState,
        user: {
          firstName: 'Fred',
          lastName: 'Firebrick',
          gender: 'm',
          email: 'mock@testing-mock.com',
          phone: '0049/123456',
          birthDate: '2018-08-06',
        },
      },
    });

    component = fixture.componentInstance;
    fixture.detectChanges();
  }
});
