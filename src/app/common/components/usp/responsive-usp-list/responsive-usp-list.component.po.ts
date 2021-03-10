import { ComponentFixture } from '@angular/core/testing';
import { ResponsiveUspListComponent } from './responsive-usp-list.component';

export class ResponsiveUspListComponentPageObj {
  private element: HTMLElement;

  constructor(private fixture: ComponentFixture<ResponsiveUspListComponent>) {
    this.element = fixture.nativeElement;
  }

  public getMobileUspItemElements(): Element[] {
    return [...this.element.querySelectorAll(`app-accordion-usp`)];
  }

  public getDesktopUspItemElements(): Element[] {
    return [...this.element.querySelectorAll(`app-simple-usp`)];
  }
}
