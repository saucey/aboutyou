import {
  HttpClientModule,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { BapiRecommendationsService } from './bapi-recommendations.service';
import { example } from './example';
import { RecommendedProduct } from './recommended-product';

// TODO #1449 proxy.conf.json isn't triggered by bapiClient, so we use this workaround
@Injectable()
class InterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const httpsReq = req.clone({
      url: req.url.replace('/api', 'http://localhost:80/api'),
    });

    return next.handle(httpsReq);
  }
}

// TODO #1431: horrible workaround, fix environment variables for tests and get rid of this monster
declare const __karma__: any;
if (process.env.TEST_API_REGRESSION || __karma__.config.args.includes('TEST_API_REGRESSION:true')) {
  describe('API Regression Tests: BapiRecommendationsService', () => {
    let service: BapiRecommendationsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          BapiRecommendationsService,
          CookieService,
          {
            provide: HTTP_INTERCEPTORS,
            useClass: InterceptorService,
            multi: true,
          },
        ],
        imports: [HttpClientModule],
      });
    });

    beforeEach(() => {
      service = TestBed.get(BapiRecommendationsService);
    });

    it('should create', () => {
      expect(service).toBeTruthy();
    });

    it('#getByRefKey should return a RecommendedProduct', (done: DoneFn) => {
      service.getByRefKey(example.prudSysResponse.firstReferenceKey).subscribe(
        (recommendedProduct: RecommendedProduct) => {
          expect(recommendedProduct.id).toEqual(example.bapiResponse.id);
          expect(recommendedProduct.title).toEqual(example.bapiResponse.title);
          expect(recommendedProduct.price).toEqual(example.bapiResponse.price);
          expect(recommendedProduct.imageHash).toEqual(example.bapiResponse.imageHash);
          done();
        },
        err => fail(err),
      );
    });

    it('#getByRefKey should return null for non-existing reference keys', (done: DoneFn) => {
      service.getByRefKey('a nonexisting ref key').subscribe(
        (recommendedProduct: RecommendedProduct) => {
          expect(recommendedProduct).toBeNull();
          done();
        },
        err => fail(err),
      );
    });
  });
}
