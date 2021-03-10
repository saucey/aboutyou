/**
 * language-specific configuration
 * A place u can specify you language related stuff
 *
 * Feel free to customize the interface!
 */

import { throwError } from 'rxjs';

export interface LscConfig<T> {
  readonly [section: string]: {
    readonly [language: string]: T;
  };
}

export type LscUnion = string | { icon: string; link: string };

export const lscConfig: LscConfig<LscUnion> = {
  loyalty: {
    de: { icon: 'payback', link: '/payback' },
    ch: { icon: 'cumulus', link: '/cumulus' },
    at: { icon: 'my-depot', link: '/my-depot' },
  },
  appStore: {
    de: 'https://apps.apple.com/de/../../depot-home-living/id575217286',
    at: 'https://apps.apple.com/at/../../depot-home-living/id575217286',
    ch: 'https://apps.apple.com/ch/../../depot-home-living/id575217286',
  },
  hotline: {
    _: '0800 400 31 1',
    de: '0800 400 31 10',
  },
};

export const getValueFromSection = (section: string, language: string): LscUnion => {
  // check if there is a language specific value
  if (lscConfig[section][language]) {
    return lscConfig[section][language];
  }
  // check if there is a default specific value
  if (lscConfig[section]._) {
    return lscConfig[section]._;
  }

  return undefined;
};
