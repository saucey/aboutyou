import { caseInsensitiveEqual } from './case-insensitive-equal';

describe('caseInsensitiveEqual', () => {
  it('should strings compare ignoring case', () => {
    expect(caseInsensitiveEqual('Sss', 'ssS')).toEqual(true);
    expect(caseInsensitiveEqual('sss', 'sss')).toEqual(true);
    expect(caseInsensitiveEqual('sss', 'sas')).toEqual(false);
  });
});
