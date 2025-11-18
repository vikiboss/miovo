import { describe, expect, it } from 'vitest'
import { formatTime } from './format-time'

describe('formatTime', () => {
  const testDate = new Date('2024-01-05T13:05:09.123')

  it('should format with default format', () => {
    expect(formatTime(testDate)).toBe('2024-01-05 13:05:09')
  })

  it('should format date only', () => {
    expect(formatTime(testDate, 'YYYY-MM-DD')).toBe('2024-01-05')
  })

  it('should format time only', () => {
    expect(formatTime(testDate, 'HH:mm:ss')).toBe('13:05:09')
  })

  it('should format with custom separator', () => {
    expect(formatTime(testDate, 'YYYY/MM/DD')).toBe('2024/01/05')
  })

  it('should handle timestamp number', () => {
    const timestamp = testDate.getTime()
    expect(formatTime(timestamp)).toBe('2024-01-05 13:05:09')
  })

  it('should handle date string', () => {
    expect(formatTime('2024-01-05T13:05:09')).toBe('2024-01-05 13:05:09')
  })

  it('should support YY token (2-digit year)', () => {
    expect(formatTime(testDate, 'YY-MM-DD')).toBe('24-01-05')
  })

  it('should support month name tokens', () => {
    expect(formatTime(testDate, 'MMMM D, YYYY')).toBe('January 5, 2024')
    expect(formatTime(testDate, 'MMM D, YYYY')).toBe('Jan 5, 2024')
  })

  it('should support single-digit tokens', () => {
    expect(formatTime(testDate, 'M/D/YYYY')).toBe('1/5/2024')
    expect(formatTime(testDate, 'H:m:s')).toBe('13:5:9')
  })

  it('should support 12-hour format', () => {
    const pm = new Date('2024-01-05T13:05:09')
    const am = new Date('2024-01-05T01:05:09')

    expect(formatTime(pm, 'hh:mm:ss A')).toBe('01:05:09 PM')
    expect(formatTime(pm, 'h:m:s a')).toBe('1:5:9 pm')
    expect(formatTime(am, 'hh:mm:ss A')).toBe('01:05:09 AM')
  })

  it('should support milliseconds', () => {
    expect(formatTime(testDate, 'HH:mm:ss.SSS')).toBe('13:05:09.123')
    expect(formatTime(testDate, 'H:m:s.SSS')).toBe('13:5:9.123')
  })

  it('should handle midnight and noon edge cases', () => {
    const midnight = new Date('2024-01-05T00:00:00')
    const noon = new Date('2024-01-05T12:00:00')

    expect(formatTime(midnight, 'hh:mm A')).toBe('12:00 AM')
    expect(formatTime(noon, 'hh:mm A')).toBe('12:00 PM')
  })

  it('should pad single digit values', () => {
    const date = new Date('2024-05-05T05:05:05')
    expect(formatTime(date, 'YYYY-MM-DD HH:mm:ss')).toBe('2024-05-05 05:05:05')
  })

  it('should handle mixed token formats', () => {
    expect(formatTime(testDate, 'YYYY/MM/DD HH:mm')).toBe('2024/01/05 13:05')
    expect(formatTime(testDate, 'MMM D, YYYY - h:mm A')).toBe('Jan 5, 2024 - 1:05 PM')
  })

  it('should throw on invalid date', () => {
    expect(() => formatTime('invalid')).toThrow('Invalid date')
  })
})
