import { clsx } from '../src/utils';

describe('clsx', () => {
  it('should return concatenated string', () => {
    expect(clsx(undefined, 'foo', null, 'bar', undefined, 'baz', null)).toBe(
      'foo bar baz',
    );
  });

  it('should return empty string if no truth args', () => {
    expect(clsx()).toBe('');
    expect(clsx(null, undefined)).toBe('');
  });
});
