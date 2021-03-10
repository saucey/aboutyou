import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservationConfirmationComponent } from './reservation-confirmation.component';
import { BreakpointObserverService } from 'src/app/common/services/breakpoint-observer.service';
import { TranslateModule } from '@ngx-translate/core';
import { GlobalModule } from 'src/app/common/global.module';
xdescribe('ReservationConfirmationComponent', () => {
  let component: ReservationConfirmationComponent;
  let fixture: ComponentFixture<ReservationConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule, GlobalModule],
      declarations: [ReservationConfirmationComponent],
      providers: [BreakpointObserverService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
