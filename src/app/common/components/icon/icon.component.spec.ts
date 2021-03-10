/* tslint:disable:no-unused-variable */
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IconComponent } from './icon.component';
import { GlobalModule } from 'src/app/common/global.module';

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IconComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  it('should create', () => {
    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
    component.icon = 'test';
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
