/**
 * Truncates a string to specified length and adds suffix if truncated.
 *
 * **Key Features:**
 * - Configurable maximum length
 * - Customizable suffix (default: '...')
 * - Returns original string if shorter than max length
 * - Length includes suffix in calculation
 *
 * @param str - String to truncate
 * @param length - Maximum length (including suffix)
 * @param suffix - Suffix to append when truncated (default: '...')
 *
 * @returns Truncated string with suffix if applicable
 *
 * @example
 * Basic usage:
 * ```ts
 * truncate('Hello world', 8)           // Returns: 'Hello...'
 * truncate('Short', 10)                 // Returns: 'Short'
 * truncate('TypeScript is awesome', 15) // Returns: 'TypeScript i...'
 * ```
 *
 * @example
 * Custom suffix:
 * ```ts
 * truncate('Hello world', 8, '…')      // Returns: 'Hello w…'
 * truncate('Long text here', 10, '>')  // Returns: 'Long text>'
 * ```
 *
 * @example
 * Edge cases:
 * ```ts
 * truncate('', 10)                     // Returns: ''
 * truncate('Hi', 10)                   // Returns: 'Hi'
 * truncate('Test', 3)                  // Returns: '...'
 * ```
 */
export function truncate(str: string, length: number, suffix = '...'): string {
  if (str.length <= length) {
    return str
  }

  const truncateLength = length - suffix.length

  if (truncateLength <= 0) {
    return suffix.slice(0, length)
  }

  return str.slice(0, truncateLength) + suffix
}
