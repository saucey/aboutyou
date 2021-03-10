import { formatNumber } from './format-number';

describe('formatNumber', () => {
  it('should format price', () => {
    expect(formatNumber(13000)).toEqual('13.000');
    expect(formatNumber(130000)).toEqual('130.000');
    expect(formatNumber(130)).toEqual('130');
    expect(formatNumber(1300)).toEqual('1.300');
  });
});
