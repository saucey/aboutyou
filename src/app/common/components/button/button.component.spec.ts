/* tslint:disable:no-unused-variable */
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ButtonComponent } from './button.component';
import { GlobalModule } from 'src/app/common/global.module';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let element: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [GlobalModule],
    }).compileComponents();
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    component.variant = 'primary';
    fixture.detectChanges();
    element = fixture.debugElement;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('button class handling', () => {
    it('should set variant class', () => {
      thenButtonHasClass('primary');
    });

    it('should not set selected class', () => {
      thenButtonHasNotClass('selected');
    });

    it('should set selected class', () => {
      component.selected = true;
      fixture.detectChanges();
      thenButtonHasClass('selected');
    });

    function thenButtonHasNotClass(clazz: string) {
      const found = element.query(By.css('button.' + clazz));
      expect(found).toBeNull();
    }

    function thenButtonHasClass(clazz: string) {
      const found = element.query(By.css('button.' + clazz));
      expect(found).toBeDefined();
    }
  });
});
