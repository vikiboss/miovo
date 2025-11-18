import { describe, expect, it } from 'vitest'
import { inRange } from './in-range'

describe('inRange', () => {
  it('should return true for values within range', () => {
    expect(inRange(5, 0, 10)).toBe(true)
    expect(inRange(25, 10, 50)).toBe(true)
    expect(inRange(0.5, 0, 1)).toBe(true)
  })

  it('should return false for values outside range', () => {
    expect(inRange(15, 0, 10)).toBe(false)
    expect(inRange(-5, 0, 10)).toBe(false)
    expect(inRange(100, 0, 50)).toBe(false)
  })

  it('should return true for boundary values (inclusive)', () => {
    expect(inRange(0, 0, 10)).toBe(true)
    expect(inRange(10, 0, 10)).toBe(true)
    expect(inRange(5, 5, 10)).toBe(true)
    expect(inRange(10, 5, 10)).toBe(true)
  })

  it('should work with negative numbers', () => {
    expect(inRange(-5, -10, 0)).toBe(true)
    expect(inRange(-15, -10, 0)).toBe(false)
    expect(inRange(-7, -10, -5)).toBe(true)
  })

  it('should work with decimal numbers', () => {
    expect(inRange(5.5, 0, 10)).toBe(true)
    expect(inRange(15.7, 0, 10)).toBe(false)
    expect(inRange(0.1, 0, 1)).toBe(true)
  })

  it('should handle edge case of same min and max', () => {
    expect(inRange(5, 5, 5)).toBe(true)
    expect(inRange(6, 5, 5)).toBe(false)
    expect(inRange(0, 0, 0)).toBe(true)
  })
})
