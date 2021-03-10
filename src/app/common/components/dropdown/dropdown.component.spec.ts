import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ITEMS } from 'src/app/core/documentation/common/components/dropdown.component.stories';

import { DropdownComponent } from './dropdown.component';

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownComponent],
    }).compileComponents();
  }));

  it('should be able to open/select/close', () => {
    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    component.sortByLabel = 'Sortiert nach: ';
    component.items = ITEMS;
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component.selectedValue).toEqual(ITEMS[0]);

    const getContentDropdown = () => fixture.debugElement.nativeElement.querySelector('.content');
    const heading = fixture.debugElement.nativeElement.querySelector('.heading');
    expect(getContentDropdown()).toEqual(null);

    heading.click();
    fixture.detectChanges();
    expect(getContentDropdown()).not.toEqual(null);

    const listItems = getContentDropdown().querySelectorAll('.item');
    const selectedItem = getContentDropdown().querySelectorAll('.item.selected')[0];
    expect(listItems.length).toEqual(ITEMS.length);
    expect(selectedItem).toEqual(listItems[0]);

    listItems[1].click();
    fixture.detectChanges();
    expect(getContentDropdown()).toEqual(null);
    expect(component.selectedValue).toEqual(ITEMS[1]);
  });
});
