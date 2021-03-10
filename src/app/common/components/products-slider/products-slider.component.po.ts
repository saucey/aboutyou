import { ComponentFixture } from '@angular/core/testing';
import { ProductsSliderComponent } from './products-slider.component';

export class ProductsSliderComponentPageObj {
  private element: HTMLElement;

  constructor(private fixture: ComponentFixture<ProductsSliderComponent>) {
    this.element = fixture.nativeElement;
  }

  public getHeadlineText(): string {
    return this.getHeadlineElem().textContent;
  }

  private getHeadlineElem(): HTMLElement {
    return this.element.querySelector('.headline');
  }

  public getItemElements(): Element[] {
    return [...this.element.querySelectorAll('a.item')];
  }

  public getImageSrc(itemIndex: number): string {
    return this.getImageElem(itemIndex).getAttribute(`src`);
  }

  private getImageElem(itemIndex: number): HTMLImageElement {
    return this.getItemElements()[itemIndex].querySelector('img');
  }

  public getTitleText(itemIndex: number): string {
    return this.getTitleElem(itemIndex).textContent;
  }

  private getTitleElem(itemIndex: number): HTMLElement {
    return this.getItemElements()[itemIndex].querySelector('.title');
  }

  public getSubtitleText(itemIndex: number): string {
    return this.getSubtitleElem(itemIndex).textContent;
  }

  private getSubtitleElem(itemIndex: number): HTMLElement {
    return this.getItemElements()[itemIndex].querySelector('.subtitle');
  }

  public getRightButtonElem(): HTMLElement {
    return this.element.querySelector('.nav-right app-circle-button');
  }

  public getLeftButtonElem(): HTMLElement {
    return this.element.querySelector('.nav-left app-circle-button');
  }

  public getLinkDestination(itemIndex: number): string {
    return this.getLinkElements()[itemIndex].getAttribute(`href`);
  }

  private getLinkElements(): Element[] {
    return [...this.element.querySelectorAll('a.item')];
  }
}
