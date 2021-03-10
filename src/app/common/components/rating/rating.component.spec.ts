/* tslint:disable:no-unused-variable */
import { SimpleChange } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RatingComponent } from './rating.component';

describe('RatingComponent', () => {
  let component: RatingComponent;
  let fixture: ComponentFixture<RatingComponent>;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RatingComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should display 5 stars', () => {
    component.rating = 5;
    component.ngOnChanges({
      rating: new SimpleChange(null, 5, true),
    });

    fixture.detectChanges();

    expect(element.querySelectorAll('.star.full').length).toBe(5);
    expect(element.querySelectorAll('.star.half').length).toBe(0);
    expect(element.querySelectorAll('.star.empty').length).toBe(0);
  });

  it('should display 3 1/2 stars', () => {
    component.rating = 3.5;
    component.ngOnChanges({
      rating: new SimpleChange(null, 3.5, false),
    });

    fixture.detectChanges();

    expect(element.querySelectorAll('.star.full').length).toBe(3);
    expect(element.querySelectorAll('.star.half').length).toBe(1);
    expect(element.querySelectorAll('.star.empty').length).toBe(1);
  });

  it('should display 1 stars', () => {
    component.rating = 0.8;
    component.ngOnChanges({
      rating: new SimpleChange(null, 0.8, false),
    });

    fixture.detectChanges();

    expect(element.querySelectorAll('.star.full').length).toBe(1);
    expect(element.querySelectorAll('.star.half').length).toBe(0);
    expect(element.querySelectorAll('.star.empty').length).toBe(4);
  });
  it('should display 5 stars', () => {
    component.calculateStars(3);

    expect(component.stars.length).toBe(5);
  });
});
