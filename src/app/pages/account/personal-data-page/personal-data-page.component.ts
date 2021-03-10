import { Location, DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserverService } from 'src/app/common/services/breakpoint-observer.service';
import { Subject, Subscription, forkJoin } from 'rxjs';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/shop/store';
import { getUser, ACCOUNT_ACTIONS } from 'src/app/core/shop/store/account';
import { AccountService } from 'src/app/core/services/account/account.service';
import { CustomerResponse, SubPageTypes } from 'src/app/core/shop/types/account';
import { CrossengageService } from 'src/app/core/services/crossengage/crossengage.service';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { GlobalMessageType } from 'src/app/common/components/global-message/global-message-type';
import { GlobalMessageComponent } from 'src/app/common/components/global-message/global-message.component';
import { GlobalMessageData } from 'src/app/common/components/global-message/global-message-data';

@Component({
  selector: 'src/app-personal-data-page',
  templateUrl: './personal-data-page.component.html',
  styleUrls: ['./personal-data-page.component.scss'],
})
export class PersonalDataPageComponent implements AfterViewInit, OnDestroy, OnInit {
  public panelOpenState = false;
  public isMobile = false;
  public profileForm: FormGroup;
  public newsletterForm: FormGroup;
  public layoutSubject$ = new Subject<void>();
  public isNewsletterSubscribed: boolean = false;
  public subPageTypes = SubPageTypes;
  private subscription = new Subscription();
  private activeSubPage: SubPageTypes = SubPageTypes.Personal;

  userSub: Subscription;
  user: any;

  constructor(
    /* tslint:disable-next-line:no-unused-variable */
    private breakpointObserver: BreakpointObserverService,
    private location: Location,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private accountService: AccountService,
    public datepipe: DatePipe,
    private crossengageService: CrossengageService,
    private matSnackbar: MatSnackBar,
    private translateService: TranslateService,
  ) {}

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      gender: ['', [Validators.required]],
      firstName: ['', [Validators.required, Validators.min(2)]],
      lastName: ['', [Validators.required, Validators.min(2)]],
      birthDate: ['', [Validators.required]],
      phone: ['', []],
      email: ['', [Validators.required, Validators.email]],
    });

    this.newsletterForm = this.formBuilder.group({
      newsletter: ['', [Validators.required]],
    });

    this.watchAccount();
  }

  ngAfterViewInit() {
    this.subscription.add(
      this.breakpointObserver.getMobileLayoutObserver().subscribe(isMobile => (this.isMobile = isMobile)),
    );
    this.subscription.add(
      this.crossengageService.getUser(this.user.email).subscribe(res => {
        this.isNewsletterSubscribed = res.status === 'confirmed';
        this.newsletterForm.patchValue({
          newsletter: this.isNewsletterSubscribed,
        });
      }),
    );
  }

  private watchAccount() {
    this.userSub = this.store.pipe(select(getUser)).subscribe(user => {
      this.user = user;
      this.profileForm.patchValue({
        gender: this.user.gender,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        birthDate: this.datepipe.transform(this.user.birthDate, 'dd.MM.yyyy'),
        phone: this.user.phone,
        email: this.user.email,
      });
    });
  }

  private updateStore(response: CustomerResponse) {
    this.store.dispatch(
      ACCOUNT_ACTIONS.setUser({
        gender: response.gender,
        firstName: response.firstName,
        lastName: response.lastName,
        birthDate: `${response.birthDate.substr(6, 4)}-${response.birthDate.substr(3, 2)}-${response.birthDate.substr(
          0,
          2,
        )}`,
        phone: response.phone,
        email: response.email,
      }),
    );
  }

  onSubmit() {
    if (this.profileForm.valid) {
      forkJoin(
        this.accountService.updatePersonalData(this.profileForm.value),
        this.accountService.updateContactData(this.profileForm.value),
      ).subscribe(
        () => this.updateStore(this.profileForm.value),
        error => console.error('Error saving personal settings', error),
      );
    }

    if (!this.isNewsletterSubscribed && this.newsletterForm.get('newsletter').value) {
      this.subscription.add(
        this.crossengageService
          .postUser({
            email: this.user.email,
            source: 'MeinDepot',
          })
          .subscribe(res => {
            const message = this.translateService.instant('NEWSLETTER.success');
            const data: GlobalMessageData = {
              message,
              type: GlobalMessageType.SUCCESS,
            };
            this.matSnackbar.openFromComponent(GlobalMessageComponent, {
              data,
              duration: 5000,
            });
          }),
      );
    }
  }

  isPersonalPage(): boolean {
    return this.activeSubPage === SubPageTypes.Personal;
  }

  isNewsletterPage(): boolean {
    return this.activeSubPage === SubPageTypes.Newsletter;
  }

  changeSubPageTo(subPageType: SubPageTypes) {
    this.activeSubPage = subPageType;
  }

  handleLogoutClick() {
    this.accountService.logout();
  }

  goBack() {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
