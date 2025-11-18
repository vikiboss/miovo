import { describe, expect, it } from 'vitest'
import { clamp } from './clamp'

describe('clamp', () => {
  it('should clamp value above max', () => {
    expect(clamp(15, 0, 10)).toBe(10)
    expect(clamp(100, 0, 50)).toBe(50)
  })

  it('should clamp value below min', () => {
    expect(clamp(-5, 0, 10)).toBe(0)
    expect(clamp(-100, 0, 50)).toBe(0)
  })

  it('should return value when within range', () => {
    expect(clamp(5, 0, 10)).toBe(5)
    expect(clamp(25, 0, 50)).toBe(25)
    expect(clamp(0, 0, 10)).toBe(0)
    expect(clamp(10, 0, 10)).toBe(10)
  })

  it('should work with negative numbers', () => {
    expect(clamp(-15, -10, -5)).toBe(-10)
    expect(clamp(-3, -10, -5)).toBe(-5)
    expect(clamp(-7, -10, -5)).toBe(-7)
  })

  it('should work with decimal numbers', () => {
    expect(clamp(5.5, 0, 10)).toBe(5.5)
    expect(clamp(15.7, 0, 10)).toBe(10)
    expect(clamp(-2.3, 0, 10)).toBe(0)
  })

  it('should handle edge cases', () => {
    expect(clamp(0, 0, 0)).toBe(0)
    expect(clamp(5, 5, 5)).toBe(5)
  })
})
