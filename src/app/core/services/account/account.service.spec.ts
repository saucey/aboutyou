import { CustomerResponse } from 'src/app/core/shop/types/account';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AccountService } from 'src/app/core/services/account/account.service';
import { accountResponseSuccessMock } from 'src/app/core/services/account/account-response-succes.mock';
import { getCustomerContactUrl, getCustomerPersonalUrl } from 'src/app/core/services/resolveEnvs';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { AppState } from 'src/app/core/shop/store';
import { initialState } from '../../shop/store/account/account.reducers';
import { NgrxTestingModule } from 'src/tests/fixtures/ngrx-testing.module';
import { DatePipe } from '@angular/common';

describe('AccountService', () => {
  let store: MockStore<Pick<AppState, 'account'>>;
  let httpTestingController: HttpTestingController;
  let service: AccountService;
  let customerContactUrl: string;
  let customerPersonalUrl: string;

  let resultResponse: CustomerResponse;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgrxTestingModule],
      providers: [DatePipe],
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(AccountService);
    customerContactUrl = getCustomerContactUrl();
    customerPersonalUrl = getCustomerPersonalUrl();

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
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('updateContactData()', () => {
    it('should call PATCH /api/customer/contact', () => {
      service
        .updateContactData({
          email: 'mock@testing-mock.com',
          phone: '0049/123456',
        })
        .subscribe(assignResultResponse());

      httpTestingController
        .expectOne(request => {
          return (
            request.url === customerContactUrl &&
            request.method === 'PATCH' &&
            request.body.email === 'mock@testing-mock.com' &&
            request.body.phone === '0049/123456'
          );
        })
        .flush(accountResponseSuccessMock);
      thenResponseIsEqual();
    });
  });

  describe('updatePersonalData()', () => {
    it('should call PATCH /api/customer/personal', () => {
      service
        .updatePersonalData({
          firstName: 'Fred',
          lastName: 'Firebrick',
          birthDate: '12.05.1977',
        })
        .subscribe(assignResultResponse());

      httpTestingController
        .expectOne(request => {
          return (
            request.url === customerPersonalUrl &&
            request.method === 'PATCH' &&
            request.body.firstName === 'Fred' &&
            request.body.lastName === 'Firebrick' &&
            request.body.birthDate === '1977-05-12'
          );
        })
        .flush(accountResponseSuccessMock);
      thenResponseIsEqual();
    });
  });

  function assignResultResponse() {
    return result => (resultResponse = result);
  }

  function thenResponseIsEqual(expectedResponse: CustomerResponse = accountResponseSuccessMock) {
    expect(expectedResponse).toEqual(resultResponse);
  }
});
