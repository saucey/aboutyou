import 'rxjs/add/observable/from';

import { OrderService } from 'src/app/core/services/order/order.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material';

import { RouterTestingWithLocalizationModule } from 'src/tests/fixtures/router-testing-with-localization.module';
import { InvoiceComponent } from './invoice.component';

import createSpyObj = jasmine.createSpyObj;

describe('InvoiceComponent', () => {
  let component: InvoiceComponent;
  let fixture: ComponentFixture<InvoiceComponent>;
  let httpTestingController: HttpTestingController;
  const OrderServiceMock = createSpyObj('OrderService', ['getInvoiceUrl']);
  const MatSnackBarMock = createSpyObj('MatSnackBar', ['open']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InvoiceComponent],
      imports: [HttpClientTestingModule, RouterTestingWithLocalizationModule],
      providers: [
        { provide: OrderService, useValue: OrderServiceMock },
        { provide: MatSnackBar, useValue: MatSnackBarMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    httpTestingController = TestBed.get(HttpTestingController);
    fixture = TestBed.createComponent(InvoiceComponent);
    component = fixture.componentInstance;
    component.currentOrder = [{ id: 1, payment: [{}] }] as any;
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });
});
