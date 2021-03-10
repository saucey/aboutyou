import { HttpClient } from '@angular/common/http';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { PrudSysClientService, PrudSysResponse } from './prud-sys-client.service';
import { PrudSysRequestParams } from './prud-sys-request-params';

describe('PrudSysClientService', () => {
  let service: PrudSysClientService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  function getMinimalParams(): PrudSysRequestParams {
    return {} as any;
  }

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('httpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [
        PrudSysClientService,
        {
          provide: HttpClient,
          useValue: httpClientSpy,
        },
      ],
    });
  });

  beforeEach(() => {
    httpClientSpy.get.and.returnValue(of({}));
    service = TestBed.get(PrudSysClientService); // .get() is obsolete, use .inject() in newer angular versions
  });

  it('Test setup works', () => {
    expect(httpClientSpy.get).toHaveBeenCalledTimes(0);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('#getRecommendations should call the correct URL and params without userid', fakeAsync(() => {
    const inputParams: PrudSysRequestParams = { cid: 'aCID', pid: 'aPID', sid: 'aSID', tracking: true };

    // `/prudsys` is redirected by `proxy.config` to avoid CORS issues
    const expectedUrl =
      '/prudsys/rde_server/res/depotDE/plugins/exec/prudsys/prudsys/core/recommendation/productDetailCurrent?sid=aSID&tracking=true&pid=aPID&cid=aCID';

    service.getRecommendations(inputParams).subscribe(res => {
      expect(httpClientSpy.get).toHaveBeenCalledWith(expectedUrl);
    });
  }));

  it('#getRecommendations should call the correct URL and params without userid', fakeAsync(() => {
    const inputParams: PrudSysRequestParams = {
      cid: 'aCID',
      pid: 'aPID',
      sid: 'aSID',
      tracking: true,
      userid: 'aUserID',
    };

    // `/prudsys` is redirected by `proxy.config` to avoid CORS issues
    const expectedUrl =
      '/prudsys/rde_server/res/depotDE/plugins/exec/prudsys/prudsys/core/recommendation/productDetailCurrent?sid=aSID&tracking=true&pid=aPID&cid=aCID&userid=aUserID';

    service.getRecommendations(inputParams).subscribe(res => {
      expect(httpClientSpy.get).toHaveBeenCalledWith(expectedUrl);
    });
  }));

  it('#getRecommendations should fire an http request', fakeAsync(() => {
    service.getRecommendations(getMinimalParams()).subscribe(res => {
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    });
  }));

  it('#getRecommendations should resolve like httpClient.get', fakeAsync(() => {
    const mockResult: PrudSysResponse = 'a result' as any;
    httpClientSpy.get.and.returnValue(of(mockResult));
    service.getRecommendations(getMinimalParams()).subscribe(res => {
      expect(res).toEqual(mockResult);
    });
  }));
});
