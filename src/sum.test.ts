import { describe, expect, it } from 'vitest'
import { sum } from './sum'

describe('sum', () => {
  it('should calculate sum of positive numbers', () => {
    expect(sum([1, 2, 3, 4, 5])).toBe(15)
    expect(sum([10, 20, 30])).toBe(60)
    expect(sum([100])).toBe(100)
  })

  it('should handle empty array', () => {
    expect(sum([])).toBe(0)
  })

  it('should handle negative numbers', () => {
    expect(sum([-1, -2, -3])).toBe(-6)
    expect(sum([-1, 1])).toBe(0)
    expect(sum([5, -3, 2])).toBe(4)
  })

  it('should handle decimal numbers', () => {
    expect(sum([1.5, 2.5])).toBe(4)
    expect(sum([0.1, 0.2, 0.3])).toBeCloseTo(0.6, 10)
    expect(sum([3.14, 2.86])).toBe(6)
  })

  it('should handle zero', () => {
    expect(sum([0, 0, 0])).toBe(0)
    expect(sum([1, 0, 2])).toBe(3)
  })

  it('should handle single element', () => {
    expect(sum([42])).toBe(42)
    expect(sum([-10])).toBe(-10)
  })

  it('should handle large numbers', () => {
    expect(sum([1000, 2000, 3000])).toBe(6000)
    expect(sum([1e6, 2e6])).toBe(3000000)
  })
})
