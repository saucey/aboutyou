import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EMPTY } from 'rxjs';
import { FooterComponent } from 'src/app/common/modules/footer/footer.component';
import { RunAppStableInitializersService } from 'src/app/core/app-stable-initializer/run-app-stable-initializers.service';
import { AccountService } from 'src/app/core/services/account/account.service';
import { BapiCategoryService } from 'src/app/core/services/bapi/bapi-category.service';
import { PreviousRouteService } from 'src/app/core/services/previous-route.service';
import { RouterTestingWithLocalizationModule } from 'src/tests/fixtures/router-testing-with-localization.module';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let previousRouterService: PreviousRouteService;
  let runAppStableInitializerService: RunAppStableInitializersService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, NoopAnimationsModule, RouterTestingWithLocalizationModule],
      providers: [
        {
          provide: RunAppStableInitializersService,
          useValue: jasmine.createSpyObj('RunAppStableInitializerService', ['initAfterAppStable']),
        },
      ],
      declarations: [],
    }).compileComponents();
  }));

  beforeEach(() => {
    spyOn(TestBed.get(BapiCategoryService) as BapiCategoryService, 'getRoots').and.returnValue(EMPTY);
    spyOn(TestBed.get(AccountService) as AccountService, 'authenticate');

    previousRouterService = TestBed.get(PreviousRouteService);
    spyOn(previousRouterService, 'init');

    runAppStableInitializerService = TestBed.get(RunAppStableInitializersService);

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should call previousRouteService.init the app', () => {
    expect(previousRouterService.init).toHaveBeenCalled();
  });

  it('should render footer', () => {
    const footerElement = fixture.debugElement.query(By.directive(FooterComponent));
    expect(footerElement.nativeElement).toBeDefined();
  });

  it('#ngOnInit should call runAppStableInitializerService.initAfterAppStable', () => {
    expect(runAppStableInitializerService.initAfterAppStable).toHaveBeenCalled();
  });
});
