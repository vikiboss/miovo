/**
 * Formats a Date object or timestamp into a string with dayjs-compatible tokens.
 *
 * **Supported tokens:**
 * - `YYYY` - 4-digit year (e.g., 2024)
 * - `YY` - 2-digit year (e.g., 24)
 * - `MMMM` - Full month name (e.g., January)
 * - `MMM` - Abbreviated month name (e.g., Jan)
 * - `MM` - 2-digit month (e.g., 01)
 * - `M` - 1-digit month (e.g., 1)
 * - `DD` - 2-digit day (e.g., 05)
 * - `D` - 1-digit day (e.g., 5)
 * - `HH` - 2-digit 24-hour (e.g., 13)
 * - `H` - 1-digit 24-hour (e.g., 13)
 * - `hh` - 2-digit 12-hour (e.g., 01)
 * - `h` - 1-digit 12-hour (e.g., 1)
 * - `mm` - 2-digit minute (e.g., 05)
 * - `m` - 1-digit minute (e.g., 5)
 * - `ss` - 2-digit second (e.g., 09)
 * - `s` - 1-digit second (e.g., 9)
 * - `SSS` - 3-digit millisecond (e.g., 123)
 * - `A` - AM/PM uppercase
 * - `a` - am/pm lowercase
 *
 * @param date - Date object, timestamp, or parseable date string
 * @param format - Format string (default: 'YYYY-MM-DD HH:mm:ss')
 *
 * @example
 * ```ts
 * const date = new Date('2024-01-05 13:05:09.123')
 * formatTime(date)                         // "2024-01-05 13:05:09"
 * formatTime(date, 'YYYY-MM-DD')          // "2024-01-05"
 * formatTime(date, 'YYYY/MM/DD HH:mm')    // "2024/01/05 13:05"
 * formatTime(date, 'MMM D, YYYY')         // "Jan 5, 2024"
 * formatTime(date, 'MMMM D, YYYY')        // "January 5, 2024"
 * formatTime(date, 'hh:mm:ss A')          // "01:05:09 PM"
 * formatTime(date, 'H:m:s.SSS')           // "13:5:9.123"
 * ```
 */
export function formatTime(date: Date | number | string, format = 'YYYY-MM-DD HH:mm:ss'): string {
  const d = new Date(date)

  if (Number.isNaN(d.getTime())) {
    throw new Error('Invalid date')
  }

  const year = d.getFullYear()
  const month = d.getMonth()
  const day = d.getDate()
  const hours = d.getHours()
  const minutes = d.getMinutes()
  const seconds = d.getSeconds()
  const milliseconds = d.getMilliseconds()

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const hours12 = hours % 12 || 12
  const ampm = hours >= 12 ? 'PM' : 'AM'

  const tokens: Record<string, string> = {
    YYYY: String(year),
    YY: String(year).slice(-2),
    MMMM: monthNames[month],
    MMM: monthNamesShort[month],
    MM: String(month + 1).padStart(2, '0'),
    M: String(month + 1),
    DD: String(day).padStart(2, '0'),
    D: String(day),
    HH: String(hours).padStart(2, '0'),
    H: String(hours),
    hh: String(hours12).padStart(2, '0'),
    h: String(hours12),
    mm: String(minutes).padStart(2, '0'),
    m: String(minutes),
    ss: String(seconds).padStart(2, '0'),
    s: String(seconds),
    SSS: String(milliseconds).padStart(3, '0'),
    A: ampm,
    a: ampm.toLowerCase(),
  }

  // Replace tokens using a single pass to avoid substring conflicts
  // Sort by length (longest first) to prioritize longer tokens
  const sortedTokens = Object.keys(tokens).toSorted((a, b) => b.length - a.length)

  // Create a regex that matches any token
  const tokenRegex = new RegExp(sortedTokens.join('|'), 'g')

  return format.replace(tokenRegex, (match) => tokens[match] || match)
}
