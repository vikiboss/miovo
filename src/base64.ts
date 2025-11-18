/**
 * Base64 encoding and decoding utilities that work in both Node.js and browser environments.
 *
 * **Key Features:**
 * - Cross-platform (Node.js and browser)
 * - Unicode support
 * - Type-safe
 *
 * @example
 * Encoding:
 * ```ts
 * const encoded = base64.encode('Hello, World!')
 * // Returns: "SGVsbG8sIFdvcmxkIQ=="
 * ```
 *
 * @example
 * Decoding:
 * ```ts
 * const decoded = base64.decode('SGVsbG8sIFdvcmxkIQ==')
 * // Returns: "Hello, World!"
 * ```
 *
 * @example
 * Unicode support:
 * ```ts
 * const encoded = base64.encode('你好世界')
 * const decoded = base64.decode(encoded) // "你好世界"
 * ```
 */
export const base64 = {
  /**
   * Encodes a string to Base64.
   *
   * @param str - String to encode
   * @returns Base64 encoded string
   */
  encode(str: string): string {
    if (typeof btoa !== 'undefined') {
      // Browser environment
      return btoa(
        encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) => {
          return String.fromCharCode(Number.parseInt(p1, 16))
        }),
      )
    }

    // Node.js environment
    return Buffer.from(str, 'utf-8').toString('base64')
  },

  /**
   * Decodes a Base64 string.
   *
   * @param str - Base64 string to decode
   * @returns Decoded string
   */
  decode(str: string): string {
    if (typeof atob !== 'undefined') {
      // Browser environment
      const decoded = atob(str)
      return decodeURIComponent(
        decoded
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join(''),
      )
    }

    // Node.js environment
    return Buffer.from(str, 'base64').toString('utf-8')
  },
}
