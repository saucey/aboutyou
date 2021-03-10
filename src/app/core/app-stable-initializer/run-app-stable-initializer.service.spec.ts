import { ApplicationRef, Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { APP_STABLE_INITIALIZER } from './app-stable-initializer.token';
import { OnAppStable } from './on-app-stable';
import { RunAppStableInitializersService } from './run-app-stable-initializers.service';

describe('RunAppStableInitializerService', () => {
  let isStableSubject: Subject<boolean>;
  let service: RunAppStableInitializersService;
  let storefrontInitializerMock1: StorefrontInitializerMock1;
  let storefrontInitializerMock2: StorefrontInitializerMock2;

  @Injectable({ providedIn: 'root' })
  class StorefrontInitializerMock1 implements OnAppStable {
    onAppStable() {
      // empty;
    }
  }

  @Injectable({ providedIn: 'root' })
  class StorefrontInitializerMock2 implements OnAppStable {
    onAppStable() {
      // empty;
    }
  }

  beforeEach(() => {
    isStableSubject = new Subject<boolean>();
    TestBed.configureTestingModule({
      providers: [
        { provide: ApplicationRef, useValue: { isStable: isStableSubject } },
        { provide: APP_STABLE_INITIALIZER, multi: true, useExisting: StorefrontInitializerMock1 },
        { provide: APP_STABLE_INITIALIZER, multi: true, useExisting: StorefrontInitializerMock2 },
      ],
    });

    storefrontInitializerMock1 = TestBed.get(StorefrontInitializerMock1);
    storefrontInitializerMock2 = TestBed.get(StorefrontInitializerMock2);
    service = TestBed.get(RunAppStableInitializersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#initAfterAppStable', () => {
    let storefrontInitializer: OnAppStable[];

    beforeEach(() => {
      storefrontInitializer = TestBed.get(APP_STABLE_INITIALIZER);
      storefrontInitializer.forEach(initializer => spyOn(initializer, 'onAppStable'));
      service.initAfterAppStable();
    });

    it('should have STOREFRONT_INITIALIZERs', () => {
      expect(storefrontInitializer.length).toBe(2);
    });

    it('should call initializer.init for all STOREFRONT_INITIALIZERs after appRef is stable', () => {
      isStableSubject.next(true);

      expect(storefrontInitializerMock1.onAppStable).toHaveBeenCalled();
      expect(storefrontInitializerMock2.onAppStable).toHaveBeenCalled();
    });

    it('should not call initializer.init for all STOREFRONT_INITIALIZERs when appRef is not stable', () => {
      isStableSubject.next(false);
      expect(storefrontInitializerMock1.onAppStable).not.toHaveBeenCalled();
      expect(storefrontInitializerMock2.onAppStable).not.toHaveBeenCalled();
    });
  });
});
