import { TestBed } from '@angular/core/testing';

import { TrustedShopService } from './trusted-shop.service';

describe('TrustedShopService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrustedShopService = TestBed.get(TrustedShopService);
    expect(service).toBeTruthy();
  });
});
