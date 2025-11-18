/**
 * Query string parsing and stringification utilities using URLSearchParams.
 */
export const qs = {
  /**
   * Parses a query string into an object.
   *
   * @param str - Query string to parse (with or without leading '?')
   * @returns Parsed object
   *
   * @example
   * ```ts
   * qs.parse('?foo=bar&baz=qux')  // { foo: 'bar', baz: 'qux' }
   * qs.parse('a=1&b=2')           // { a: '1', b: '2' }
   * qs.parse('foo')               // { foo: '' }
   * ```
   */
  parse(str: string): Record<string, string> {
    const query = str.startsWith('?') ? str.slice(1) : str
    if (!query) return {}
    return Object.fromEntries(new URLSearchParams(query))
  },

  /**
   * Stringifies an object into a query string.
   *
   * @param obj - Object to stringify
   * @param addPrefix - Add '?' prefix (default: false)
   * @returns Query string
   *
   * @example
   * ```ts
   * qs.stringify({ foo: 'bar', baz: 'qux' })         // "foo=bar&baz=qux"
   * qs.stringify({ foo: 'bar' }, true)               // "?foo=bar"
   * qs.stringify({ name: '张三' })                   // "name=%E5%BC%A0%E4%B8%89"
   * ```
   */
  stringify(obj: Record<string, any>, addPrefix = false): string {
    const entries = Object.entries(obj)
      .filter(([_, value]) => value !== undefined && value !== null)
      .map(([key, value]) => [key, String(value)] as [string, string])

    const result = new URLSearchParams(entries).toString()
    return addPrefix && result ? `?${result}` : result
  },
}
