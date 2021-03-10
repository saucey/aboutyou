export interface IPersonalGiftBannerConfigMap {
  readonly [shopId: number]: IPersonalGiftBannerConfig | undefined;
}

export interface IPersonalGiftBannerConfig {
  /**
   * Configuration of the necessary Sovendus variables.
   *
   * See the documentation for details:
   * https://depot-online.atlassian.net/wiki/spaces/IN/pages/916258972/Sovendus
   */
  readonly sovendus: ISovendusConfig;
}

export interface ISovendusConfig {
  readonly trafficSourceNumber: number;
  readonly trafficMediumNumber: number;
}

export const personalGiftUrl = 'https://api.sovendus.com/sovabo/common/js/flexibleIframe.js';

export const personalGiftBanner: IPersonalGiftBannerConfigMap = {
  1: /* de-DE */ {
    sovendus: {
      trafficSourceNumber: 1967,
      trafficMediumNumber: 2,
    },
  },
  3: /* de-AT */ {
    sovendus: {
      trafficSourceNumber: 1968,
      trafficMediumNumber: 2,
    },
  },
  3031: /* de-CH */ {
    sovendus: {
      trafficSourceNumber: 1969,
      trafficMediumNumber: 2,
    },
  },
  3032: /* fr-CH */ {
    sovendus: {
      trafficSourceNumber: 3579,
      trafficMediumNumber: 2,
    },
  },
};
