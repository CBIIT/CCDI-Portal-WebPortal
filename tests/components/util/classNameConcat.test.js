import cn from '../../../src/components/util/classNameConcat';

describe('classNameConcat (cn)', () => {
  it('should join truthy class fragments with a single space', () => {
    expect(cn('a', 'b')).toBe('a b');
  });

  it('should omit falsy fragments so className strings stay valid', () => {
    expect(cn('foo', undefined, '', null, false, 'bar')).toBe('foo bar');
  });
});
