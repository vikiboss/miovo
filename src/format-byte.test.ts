import { describe, expect, it } from 'vitest'
import { formatByte } from './format-byte'

describe('formatByte', () => {
  it('should format bytes', () => {
    expect(formatByte(0)).toBe('0 B')
    expect(formatByte(100)).toBe('100 B')
    expect(formatByte(999)).toBe('999 B')
  })

  it('should format kilobytes (decimal by default)', () => {
    expect(formatByte(1000)).toBe('1.00 KB')
    expect(formatByte(1500)).toBe('1.50 KB')
    expect(formatByte(2000)).toBe('2.00 KB')
  })

  it('should format megabytes (decimal)', () => {
    expect(formatByte(1000000)).toBe('1.00 MB')
    expect(formatByte(1500000)).toBe('1.50 MB')
  })

  it('should format gigabytes (decimal)', () => {
    expect(formatByte(1000000000)).toBe('1.00 GB')
    expect(formatByte(2000000000)).toBe('2.00 GB')
  })

  it('should format terabytes (decimal)', () => {
    expect(formatByte(1000000000000)).toBe('1.00 TB')
  })

  it('should format petabytes (decimal)', () => {
    expect(formatByte(1000000000000000)).toBe('1.00 PB')
  })

  it('should format with binary units when specified', () => {
    expect(formatByte(1024, 2, true)).toBe('1.00 KiB')
    expect(formatByte(1536, 2, true)).toBe('1.50 KiB')
    expect(formatByte(1048576, 2, true)).toBe('1.00 MiB')
  })

  it('should handle custom precision', () => {
    expect(formatByte(1500, 0)).toBe('2 KB')
    expect(formatByte(1500, 1)).toBe('1.5 KB')
    expect(formatByte(1500, 3)).toBe('1.500 KB')
  })

  it('should handle negative values', () => {
    expect(formatByte(-1000)).toBe('-1.00 KB')
    expect(formatByte(-1000000)).toBe('-1.00 MB')
  })

  it('should handle very large values', () => {
    const petabyte = 1000000000000000
    expect(formatByte(petabyte)).toBe('1.00 PB')
    expect(formatByte(petabyte * 5)).toBe('5.00 PB')
  })

  it('should use default precision of 2', () => {
    expect(formatByte(1500)).toBe('1.50 KB')
    expect(formatByte(1500000)).toBe('1.50 MB')
  })

  it('should use decimal by default', () => {
    expect(formatByte(1000)).toBe('1.00 KB')
    expect(formatByte(1000, 2, false)).toBe('1.00 KB')
  })
})
