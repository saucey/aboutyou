import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateTestingModule } from 'src/tests/fixtures/translate-testing.module';

import { CrossengageService } from 'src/app/core/services/crossengage/crossengage.service';
import { SubscribeNewsletterComponent } from './subscribe-newsletter.component';
import createSpyObj = jasmine.createSpyObj;

describe('SubscribeNewsletterComponent', () => {
  let component: SubscribeNewsletterComponent;
  let fixture: ComponentFixture<SubscribeNewsletterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslateTestingModule],
      declarations: [SubscribeNewsletterComponent],
      providers: [
        { provide: MatSnackBar, useValue: createSpyObj('MatSnackBar', ['openFromComponent']) },
        { provide: CrossengageService, useValue: createSpyObj('CrossengageService', ['getUser', 'postUser']) },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribeNewsletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
