/**
 * Formats bytes into a human-readable string.
 *
 * **Key Features:**
 * - Automatically selects appropriate unit (B, KB, MB, GB, TB, PB)
 * - Binary (1024) or decimal (1000) units
 * - Customizable precision
 * - Clean, readable output
 *
 * @param bytes - Number of bytes to format
 * @param precision - Number of decimal places (default: 2)
 * @param binary - Use binary units (1024) instead of decimal (1000) (default: false)
 *
 * @returns Formatted byte string
 *
 * @example
 * Basic usage (decimal by default):
 * ```ts
 * formatByte(1000)           // "1.00 KB"
 * formatByte(1500)           // "1.50 KB"
 * formatByte(1000000)        // "1.00 MB"
 * formatByte(1000000000)     // "1.00 GB"
 * ```
 *
 * @example
 * Binary units:
 * ```ts
 * formatByte(1024, 2, true)  // "1.00 KiB"
 * formatByte(1536, 2, true)  // "1.50 KiB"
 * ```
 *
 * @example
 * Custom precision:
 * ```ts
 * formatByte(1536, 0)        // "2 KB"
 * formatByte(1536, 1)        // "1.5 KB"
 * formatByte(1536, 3)        // "1.500 KB"
 * ```
 */
export function formatByte(bytes: number, precision = 2, binary = false): string {
  const abs = Math.abs(bytes)
  const sign = bytes < 0 ? '-' : ''
  const base = binary ? 1024 : 1000
  const units = binary ? ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB'] : ['B', 'KB', 'MB', 'GB', 'TB', 'PB']

  if (abs < base) {
    return `${sign}${abs} ${units[0]}`
  }

  const exp = Math.min(Math.floor(Math.log(abs) / Math.log(base)), units.length - 1)
  const value = abs / Math.pow(base, exp)

  return `${sign}${value.toFixed(precision)} ${units[exp]}`
}
