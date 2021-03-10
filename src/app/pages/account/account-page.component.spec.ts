import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NgrxTestingModule } from 'src/tests/fixtures/ngrx-testing.module';
import { RouterTestingWithLocalizationModule } from 'src/tests/fixtures/router-testing-with-localization.module';
import { AccountPageComponent } from './account-page.component';
import { AccountModule } from './account.module';
import { CookieService } from 'ngx-cookie-service';

describe('AccountPageComponent', () => {
  let component: AccountPageComponent;
  let fixture: ComponentFixture<AccountPageComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AccountModule, RouterTestingWithLocalizationModule, NgrxTestingModule],
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
    fixture = TestBed.createComponent(AccountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }
});
