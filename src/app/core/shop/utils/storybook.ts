import { NgModuleMetadata } from '@storybook/angular/dist/client/preview/types';

export const includeModuleMetadata = /* istanbul ignore next: no need to test this */ (
  Components: any[],
  imports?: any[],
  providers?: any[],
): { moduleMetadata: NgModuleMetadata } => ({
  moduleMetadata: {
    declarations: Components,
    imports,
    providers,
  },
});
