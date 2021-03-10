import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, Input, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { ShopService } from 'src/app/core/services/shop.service';
import { trustedShopConfig } from 'src/app/configs/shop/trusted-shop';
import { TrustedShopService } from './services/trusted-shop.service';

export interface TrustedShopCheckoutData {
  orderNumber: string;
  buyerEmail: string;
  orderAmount: string;
  orderCurrency: string;
}

export enum TrustedShopType {
  BADGE = 'badge',
  CHECKOUT = 'checkout',
}

@Component({
  selector: 'app-trusted-shop',
  templateUrl: './trusted-shop.component.html',
  styleUrls: ['./trusted-shop.component.scss'],
})
export class TrustedShopComponent implements AfterViewInit, OnInit {
  public constructor(
    private readonly shopService: ShopService,
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(PLATFORM_ID) private platformId: object,
    private readonly renderer: Renderer2,
    private trustedShopService: TrustedShopService,
  ) {}

  @Input()
  public checkoutData: TrustedShopCheckoutData;

  @Input()
  public type: TrustedShopType;

  trustedShopType = TrustedShopType;

  ngOnInit(): void {
    // Trusted Shop is only shown in the browser.
    // It requires configuration of global window variables.
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const trustedShopId = this.getTrustedShopId();

    if (trustedShopId) {
      this.loadTrustedShopScript(trustedShopId);
    }
  }

  /**
   * get the trusted shop id from the shop service
   */
  private getTrustedShopId(): string | undefined {
    const shopId = this.shopService.getShopId();
    if (!shopId) {
      return;
    }
    return trustedShopConfig[shopId].id || undefined;
  }

  /**
   * Put the Trustedshop script in the header and added the configuration to the `window`.
   *
   * The script and config set only the first time they are called.
   *
   * The configuration and the added functionalities are accesable in the browser.
   * config: `_tsCondig`
   * function: `trustbadge`
   *
   * @param trustedShopId Trustedshop id
   */
  private loadTrustedShopScript(trustedShopId: string): void {
    if (trustedShopId) {
      let tsConfig: any;
      tsConfig = {
        yOffset: '0',
        variant: 'custom_reviews',
        customElementId: 'trusted-shop-badge' /* required for variants custom and custom_reviews */,
        customCheckoutElementId: 'trusted-shop-confirmation',
        trustcardDirection: '' /* for custom variants: topRight, topLeft, bottomRight, bottomLeft */,
        disableResponsive: 'true',
        disableTrustbadge: 'false',
        trustCardTrigger: 'click',
      };

      // Added trusted shop config to the window
      if (!this.trustedShopService.jsAdded) {
        (window as any)._tsConfig = tsConfig;

        const scriptElement = this.renderer.createElement('script');
        scriptElement.type = 'text/javascript';
        scriptElement.async = true;
        scriptElement.src = `https://widgets.trustedshops.com/js/${trustedShopId}.js`;

        this.renderer.appendChild(this.document.head, scriptElement);
        this.trustedShopService.jsAdded = true;
      }
    }
  }
}
