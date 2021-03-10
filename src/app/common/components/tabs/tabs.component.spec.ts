import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TabComponent } from '../tab/tab.component';
import { TabsComponent } from './tabs.component';

describe('TabsComponent', () => {
  @Component({
    selector: 'app-cmp',
    template: `
      <app-product-content-tabs>
        <app-product-content-tab [label]="'tab 1'" [default]="false">Tab 1</app-product-content-tab>
        <app-product-content-tab [label]="'tab 2'" [default]="false"> Tab 2</app-product-content-tab>
      </app-product-content-tabs>
    `,
  })
  class TestWrapperComponent {}

  let component: TabsComponent;
  let fixture: ComponentFixture<TestWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabsComponent, TabComponent, TestWrapperComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestWrapperComponent);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should activate the first tab on click', async () => {
    const tab1 = fixture.debugElement.query(By.directive(TabComponent));
    tab1.triggerEventHandler('click', MouseEventMock());
    fixture.detectChanges();
    const tabs = fixture.debugElement.queryAll(By.directive(TabComponent));
    expect(tabs[0].componentInstance.isActive).toBe(true);
    expect(tabs[1].componentInstance.isActive).toBe(false);
  });

  function MouseEventMock() {
    return {
      preventDefault() {
        return true;
      },
      stopPropagation() {
        return true;
      },
    };
  }
});
