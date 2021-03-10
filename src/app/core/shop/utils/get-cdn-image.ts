import { getBapiCdnUrl } from 'src/app/core/services/resolveEnvs';

const CdnSizeMapping = {
  small: {
    width: 150,
    height: 150,
  },
  medium: {
    width: 600,
    height: 600,
  },
  large: {
    width: 1200,
    height: 1200,
  },
  extralarge: {
    width: 2400,
    height: 2400,
  },
};

export type CDNImageSize = keyof typeof CdnSizeMapping;

export interface ICdnOptions {
  quality?: number;
  progressive?: number;
  bg?: string;
  size?: CDNImageSize;
  brightness?: number;
}

const CdnBaseUrl = getBapiCdnUrl();

const getCdnImageUrl = (hash: string, options: ICdnOptions = {}) => {
  const params = [];

  if (options.quality) {
    params.push(`quality=${encodeURIComponent(options.quality)}`);
  }

  if (options.progressive) {
    params.push(`progressive=${encodeURIComponent(options.progressive)}`);
  }

  if (options.bg) {
    params.push(`bg=${encodeURIComponent(options.bg)}`);
  }

  if (options.size) {
    params.push(`width=${CdnSizeMapping[options.size].width}`);
    params.push(`height=${CdnSizeMapping[options.size].height}`);
  }

  if (options.brightness) {
    params.push(`brightness=${encodeURIComponent(options.brightness)}`);
  }

  return `${CdnBaseUrl}/${hash}?${params.join('&')}`;
};

export { getCdnImageUrl, CdnBaseUrl };
