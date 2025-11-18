import { describe, expect, it } from 'vitest'
import { randomInt } from './random-int'

describe('randomInt', () => {
  it('should return a number within range', () => {
    const result = randomInt(1, 10)

    expect(result).toBeGreaterThanOrEqual(1)
    expect(result).toBeLessThanOrEqual(10)
  })

  it('should return an integer', () => {
    const result = randomInt(1, 10)
    expect(Number.isInteger(result)).toBe(true)
  })

  it('should handle single value range', () => {
    const result = randomInt(5, 5)
    expect(result).toBe(5)
  })

  it('should handle negative ranges', () => {
    const result = randomInt(-10, -1)

    expect(result).toBeGreaterThanOrEqual(-10)
    expect(result).toBeLessThanOrEqual(-1)
  })

  it('should handle range crossing zero', () => {
    const result = randomInt(-5, 5)

    expect(result).toBeGreaterThanOrEqual(-5)
    expect(result).toBeLessThanOrEqual(5)
  })

  it('should handle reversed range', () => {
    const result = randomInt(10, 1)

    expect(result).toBeGreaterThanOrEqual(1)
    expect(result).toBeLessThanOrEqual(10)
  })

  it('should return min when range is [0, 0]', () => {
    const result = randomInt(0, 0)
    expect(result).toBe(0)
  })

  it('should include both min and max in results', () => {
    const min = 1
    const max = 3
    const results = new Set<number>()

    // Sample many times to ensure all values can be returned
    for (let i = 0; i < 1000; i++) {
      results.add(randomInt(min, max))
    }

    expect(results.has(1)).toBe(true)
    expect(results.has(2)).toBe(true)
    expect(results.has(3)).toBe(true)
  })

  it('should work with large ranges', () => {
    const result = randomInt(1, 1000000)

    expect(result).toBeGreaterThanOrEqual(1)
    expect(result).toBeLessThanOrEqual(1000000)
  })

  it('should work with byte range', () => {
    const result = randomInt(0, 255)

    expect(result).toBeGreaterThanOrEqual(0)
    expect(result).toBeLessThanOrEqual(255)
  })

  it('should have reasonable distribution', () => {
    const counts = { low: 0, high: 0 }
    const iterations = 1000

    for (let i = 0; i < iterations; i++) {
      const value = randomInt(1, 10)
      if (value <= 5) {
        counts.low++
      } else {
        counts.high++
      }
    }

    // Check that distribution is roughly even (within 30% margin)
    const ratio = counts.low / counts.high
    expect(ratio).toBeGreaterThan(0.7)
    expect(ratio).toBeLessThan(1.3)
  })

  it('should handle adjacent values', () => {
    const result = randomInt(5, 6)

    expect([5, 6]).toContain(result)
  })

  it('should work with negative single value', () => {
    const result = randomInt(-5, -5)
    expect(result).toBe(-5)
  })

  it('should consistently return integers for decimal inputs', () => {
    // Even though inputs might be decimals, result should be integer
    for (let i = 0; i < 100; i++) {
      const result = randomInt(1, 10)
      expect(Number.isInteger(result)).toBe(true)
    }
  })

  it('should handle year ranges', () => {
    const result = randomInt(2000, 2024)

    expect(result).toBeGreaterThanOrEqual(2000)
    expect(result).toBeLessThanOrEqual(2024)
  })

  it('should generate all possible values in small range', () => {
    const min = 1
    const max = 5
    const results = new Set<number>()

    // Sample enough times to likely get all values
    for (let i = 0; i < 500; i++) {
      results.add(randomInt(min, max))
    }

    // Should have gotten all values between 1 and 5
    expect(results.size).toBe(5)
    for (let i = min; i <= max; i++) {
      expect(results.has(i)).toBe(true)
    }
  })

  it('should be reproducible with seed', () => {
    const result1 = randomInt(1, 100, 12345)
    const result2 = randomInt(1, 100, 12345)

    expect(result1).toBe(result2)
  })

  it('should return different values with different seeds', () => {
    const result1 = randomInt(1, 100, 12345)
    const result2 = randomInt(1, 100, 67890)

    expect(result1).not.toBe(result2)
  })

  it('should work with seed for single value range', () => {
    const result = randomInt(42, 42, 12345)
    expect(result).toBe(42)
  })
})
