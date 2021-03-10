import { Component, Inject, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { personalGiftUrl, personalGiftBanner, ISovendusConfig } from 'src/app/configs/shop/personal-gift-banner';
import { ShopService } from 'src/app/core/services/shop.service';

@Component({
  selector: 'app-personal-gift-banner',
  templateUrl: './personal-gift-banner.component.html',
  styleUrls: ['./personal-gift-banner.component.scss'],
})
export class PersonalGiftBannerComponent implements OnInit {
  public constructor(
    private readonly shopService: ShopService,
    private readonly renderer: Renderer2,
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  public ngOnInit(): void {
    // Personal Gift Banner is only shown in the browser.
    // It requires configuration of global window variable.
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const sovendusConfig = this.getSovendusConfig();
    if (sovendusConfig) {
      this.configureSovendus(sovendusConfig);
      this.loadSovendusScript();
    }
  }

  private getSovendusConfig(): ISovendusConfig | undefined {
    const shopId = this.shopService.getShopId();
    const personalGiftBannerConfig = personalGiftBanner[shopId];

    return personalGiftBannerConfig && personalGiftBannerConfig.sovendus;
  }

  private configureSovendus(sovendusConfig: ISovendusConfig): void {
    // The object properties after trafficMediumNumber can be provided,
    // but don't have to be provided.
    //
    // See the documentation for details:
    // https://depot-online.atlassian.net/wiki/spaces/IN/pages/916258972/Sovendus
    const scriptElement = this.renderer.createElement('script');
    scriptElement.type = 'text/javascript';
    scriptElement.innerHTML = `
      window.sovIframes = window.sovIframes || [];
      window.sovIframes.push({
        iframeContainerId: 'sovendus-container-1',
        trafficSourceNumber: ${sovendusConfig.trafficSourceNumber},
        trafficMediumNumber: ${sovendusConfig.trafficMediumNumber},

        sessionId: '',
        timestamp: '',
        orderId: '',
        orderValue: '',
        orderCurrency: '',
        usedCouponCode: ''
      });
    `;

    this.renderer.appendChild(this.document.head, scriptElement);
  }

  private loadSovendusScript(): void {
    const scriptElement = this.renderer.createElement('script');
    scriptElement.type = 'text/javascript';
    scriptElement.async = true;
    scriptElement.src = personalGiftUrl;

    this.renderer.appendChild(this.document.head, scriptElement);
  }
}
