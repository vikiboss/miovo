import { describe, expect, it } from 'vitest'
import { formatMs } from './format-ms'

describe('formatMs', () => {
  it('should format milliseconds in composite mode (default)', () => {
    expect(formatMs(100)).toBe('100ms')
    expect(formatMs(500)).toBe('500ms')
    expect(formatMs(999)).toBe('999ms')
  })

  it('should format seconds in composite mode', () => {
    expect(formatMs(1000)).toBe('1s')
    expect(formatMs(1500)).toBe('1s 500ms')
    expect(formatMs(30000)).toBe('30s')
  })

  it('should format minutes in composite mode', () => {
    expect(formatMs(60000)).toBe('1m')
    expect(formatMs(90000)).toBe('1m 30s')
    expect(formatMs(3540000)).toBe('59m')
  })

  it('should format hours in composite mode', () => {
    expect(formatMs(3600000)).toBe('1h')
    expect(formatMs(5400000)).toBe('1h 30m')
    expect(formatMs(82800000)).toBe('23h')
  })

  it('should format days in composite mode', () => {
    expect(formatMs(86400000)).toBe('1d')
    expect(formatMs(172800000)).toBe('2d')
    expect(formatMs(259200000)).toBe('3d')
  })

  it('should respect default maxUnits of 2', () => {
    expect(formatMs(3665000)).toBe('1h 1m')
    expect(formatMs(93784000)).toBe('1d 2h')
  })

  it('should handle custom precision in single unit mode', () => {
    expect(formatMs(1234, { composite: false, precision: 0 })).toBe('1s')
    expect(formatMs(1234, { composite: false, precision: 1 })).toBe('1.2s')
    expect(formatMs(1234, { composite: false, precision: 3 })).toBe('1.234s')
  })

  it('should handle negative values', () => {
    expect(formatMs(-1000)).toBe('-1s')
    expect(formatMs(-90000)).toBe('-1m 30s')
    expect(formatMs(-500)).toBe('-500ms')
  })

  it('should handle zero', () => {
    expect(formatMs(0)).toBe('0ms')
  })

  it('should handle very small values', () => {
    expect(formatMs(1)).toBe('1ms')
    expect(formatMs(10)).toBe('10ms')
  })

  it('should handle large values', () => {
    expect(formatMs(604800000)).toBe('7d')
    expect(formatMs(2592000000)).toBe('30d')
  })

  describe('single unit mode', () => {
    it('should format with single unit when composite is false', () => {
      expect(formatMs(1234, { composite: false })).toBe('1.23s')
      expect(formatMs(61234, { composite: false })).toBe('1.02m')
      expect(formatMs(3600000, { composite: false })).toBe('1.00h')
    })

    it('should use default precision of 2', () => {
      expect(formatMs(1234, { composite: false })).toBe('1.23s')
      expect(formatMs(61234, { composite: false })).toBe('1.02m')
    })
  })

  describe('composite mode', () => {
    it('should format composite time with multiple units', () => {
      expect(formatMs(90000, { composite: true })).toBe('1m 30s')
      expect(formatMs(3665000, { composite: true, maxUnits: 3 })).toBe('1h 1m 5s')
      expect(formatMs(93784000, { composite: true, maxUnits: 4 })).toBe('1d 2h 3m 4s')
    })

    it('should handle maxUnits limit', () => {
      expect(formatMs(93784000, { composite: true, maxUnits: 2 })).toBe('1d 2h')
      expect(formatMs(93784000, { composite: true, maxUnits: 3 })).toBe('1d 2h 3m')
      expect(formatMs(3665000, { composite: true, maxUnits: 1 })).toBe('1h')
    })

    it('should handle single units in composite mode', () => {
      expect(formatMs(1000, { composite: true })).toBe('1s')
      expect(formatMs(60000, { composite: true })).toBe('1m')
      expect(formatMs(500, { composite: true })).toBe('500ms')
    })

    it('should handle zero in composite mode', () => {
      expect(formatMs(0, { composite: true })).toBe('0ms')
    })

    it('should handle negative values in composite mode', () => {
      expect(formatMs(-90000, { composite: true })).toBe('-1m 30s')
      expect(formatMs(-3665000, { composite: true, maxUnits: 3 })).toBe('-1h 1m 5s')
    })
  })
})
