import { HighlightPipe } from './highlight.pipe';

describe('Pipe: highlight', () => {
  it('should highlight the search key', () => {
    const highlight = new HighlightPipe();
    expect(highlight.transform('This is my sample string', 'sample')).toEqual('This is my <b>sample</b> string');
    expect(highlight.transform('This is my sample string', undefined)).toEqual('This is my sample string');
  });
});
