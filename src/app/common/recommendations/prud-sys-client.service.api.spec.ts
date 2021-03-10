import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { example } from './example';
import { PrudSysClientService } from './prud-sys-client.service';

// TODO #1431: horrible workaround, fix environment variables for tests and get rid of this monster
declare const __karma__: any;
if (process.env.TEST_API_REGRESSION || __karma__.config.args.includes('TEST_API_REGRESSION:true')) {
  describe('API Regression Tests: PrudSysClientService', () => {
    let service: PrudSysClientService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [PrudSysClientService],
        imports: [HttpClientModule],
      });
    });

    beforeEach(() => {
      service = TestBed.get(PrudSysClientService);
    });

    it('should create', () => {
      expect(service).toBeTruthy();
    });

    it('#getRecommendations should return a title', (done: DoneFn) => {
      service.getRecommendations(example.params).subscribe(
        res => {
          expect(res.recommendations.slider1.title).toEqual(example.prudSysResponse.title);
          done();
        },
        err => fail(err),
      );
    });

    it('#getRecommendations should return recommendations', (done: DoneFn) => {
      service.getRecommendations(example.params).subscribe(
        res => {
          expect(res.recommendations.slider1.content.length).toBeGreaterThan(0);
          done();
        },
        err => fail(err),
      );
    });

    it('#getRecommendations should return product reference keys', (done: DoneFn) => {
      service.getRecommendations(example.params).subscribe(
        res => {
          expect(res.recommendations.slider1.content[0].data.UID).toEqual(example.prudSysResponse.firstReferenceKey);
          done();
        },
        err => fail(err),
      );
    });
  });
}
