/**
 * Formats milliseconds into a human-readable string.
 *
 * **Key Features:**
 * - Automatically selects appropriate time unit
 * - Supports from milliseconds to days
 * - Customizable precision
 * - Composite format support (e.g., "1h 30m 45s")
 * - Clean, readable output
 *
 * @param ms - Milliseconds to format
 * @param options - Formatting options
 * @param options.precision - Number of decimal places for single unit mode (default: 2)
 * @param options.composite - Use composite format showing multiple units (default: true)
 * @param options.maxUnits - Maximum number of units to show in composite mode (default: 2)
 *
 * @returns Formatted time string
 *
 * @example
 * Composite mode (default):
 * ```ts
 * formatMs(500)                    // "500ms"
 * formatMs(1500)                   // "1s 500ms"
 * formatMs(90000)                  // "1m 30s"
 * formatMs(3665000)                // "1h 1m"
 * formatMs(93784000)               // "1d 2h"
 * formatMs(93784000, { maxUnits: 4 }) // "1d 2h 3m 4s"
 * ```
 *
 * @example
 * Single unit mode:
 * ```ts
 * formatMs(1500, { composite: false })         // "1.50s"
 * formatMs(60000, { composite: false })        // "1.00m"
 * formatMs(3600000, { composite: false })      // "1.00h"
 * formatMs(90000, { composite: false, precision: 1 }) // "1.5m"
 * ```
 */
export function formatMs(
  ms: number,
  options: { precision?: number; composite?: boolean; maxUnits?: number } = {},
): string {
  const { precision = 2, composite = true, maxUnits = 2 } = options
  const abs = Math.abs(ms)
  const sign = ms < 0 ? '-' : ''

  if (composite) {
    const units = [
      { name: 'd', value: 86400000 },
      { name: 'h', value: 3600000 },
      { name: 'm', value: 60000 },
      { name: 's', value: 1000 },
      { name: 'ms', value: 1 },
    ]

    const parts: string[] = []
    let remaining = abs

    for (const unit of units) {
      if (parts.length >= maxUnits) break

      const value = Math.floor(remaining / unit.value)
      if (value > 0) {
        parts.push(`${value}${unit.name}`)
        remaining -= value * unit.value
      }
    }

    return parts.length > 0 ? sign + parts.join(' ') : '0ms'
  }

  // Single unit mode
  if (abs < 1000) {
    return `${sign}${abs.toFixed(0)}ms`
  }

  if (abs < 60000) {
    return `${sign}${(abs / 1000).toFixed(precision)}s`
  }

  if (abs < 3600000) {
    return `${sign}${(abs / 60000).toFixed(precision)}m`
  }

  if (abs < 86400000) {
    return `${sign}${(abs / 3600000).toFixed(precision)}h`
  }

  return `${sign}${(abs / 86400000).toFixed(precision)}d`
}
