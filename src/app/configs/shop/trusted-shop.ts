export interface TrustedShopConfig {
  readonly [shopId: number]: { id: string };
}

export const trustedShopConfig: TrustedShopConfig = {
  1: { id: 'X144D78A06954098D9BDD3C9B92F299A2' }, // de-DE
  3: { id: 'X82D18A3424F641316ED43DCA6DACC09E' }, // de-AT
  3031: { id: 'X749F9EB8A76A32E9FC2A58DAEF3D9BDA' }, // de-CH
  3032: undefined, // fr-CH - not configured
};
