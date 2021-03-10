import { async, TestBed } from '@angular/core/testing';
import { LazyGoogleMapsService } from './lazy-google-maps.service';

describe('LazyGoogleMapsService', () => {
  let service: LazyGoogleMapsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [LazyGoogleMapsService, { provide: 'mapsAPI', useValue: 'AIzaSyBEv1X-5NgxGv9f1XmebHiz0UAulBE4qPY' }],
    }).compileComponents();

    service = TestBed.get(LazyGoogleMapsService);
  }));

  it('should be created', () => {
    expect(service).toBeDefined();
  });
});
