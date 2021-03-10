import { BapiCategory } from '@aboutyou/backbone/types/BapiCategory';

export interface NavbarCategory extends BapiCategory {
  highlight?: boolean;
  shortSlug: string;
  children?: NavbarCategory[];
}

export interface IAugmentedCategory extends NavbarCategory {
  isOpen?: boolean;
  isActive?: boolean;
}
