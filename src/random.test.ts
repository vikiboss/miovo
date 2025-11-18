import { describe, expect, it } from 'vitest'
import { Random, random } from './random'

describe('Random', () => {
  describe('constructor', () => {
    it('should create instance with valid seed', () => {
      const rng = new Random(12345)
      expect(rng).toBeInstanceOf(Random)
    })

    it('should throw error for zero seed', () => {
      expect(() => new Random(0)).toThrow('Seed cannot be zero')
    })

    it('should handle negative seeds', () => {
      const rng = new Random(-123)
      expect(rng.random()).toBeGreaterThanOrEqual(0)
      expect(rng.random()).toBeLessThan(1)
    })
  })

  describe('random()', () => {
    it('should generate numbers between 0 and 1', () => {
      const rng = new Random(12345)
      for (let i = 0; i < 100; i++) {
        const value = rng.random()
        expect(value).toBeGreaterThanOrEqual(0)
        expect(value).toBeLessThan(1)
      }
    })

    it('should generate reproducible sequence with same seed', () => {
      const rng1 = new Random(42)
      const rng2 = new Random(42)

      const sequence1 = Array.from({ length: 10 }, () => rng1.random())
      const sequence2 = Array.from({ length: 10 }, () => rng2.random())

      expect(sequence1).toEqual(sequence2)
    })

    it('should generate different sequences with different seeds', () => {
      const rng1 = new Random(123)
      const rng2 = new Random(456)

      const sequence1 = Array.from({ length: 10 }, () => rng1.random())
      const sequence2 = Array.from({ length: 10 }, () => rng2.random())

      expect(sequence1).not.toEqual(sequence2)
    })

    it('should generate uniformly distributed values', () => {
      const rng = new Random(999)
      const buckets = Array.from({ length: 10 }, () => 0)

      // Generate 10000 random numbers
      for (let i = 0; i < 10000; i++) {
        const value = rng.random()
        const bucket = Math.floor(value * 10)
        buckets[bucket]++
      }

      // Each bucket should have roughly 1000 values (with some variance)
      buckets.forEach((count) => {
        expect(count).toBeGreaterThan(800)
        expect(count).toBeLessThan(1200)
      })
    })
  })

  describe('int()', () => {
    it('should generate integers in specified range', () => {
      const rng = new Random(12345)
      for (let i = 0; i < 100; i++) {
        const value = rng.int(1, 10)
        expect(value).toBeGreaterThanOrEqual(1)
        expect(value).toBeLessThanOrEqual(10)
        expect(Number.isInteger(value)).toBe(true)
      }
    })

    it('should generate reproducible integer sequence', () => {
      const rng1 = new Random(777)
      const rng2 = new Random(777)

      const sequence1 = Array.from({ length: 10 }, () => rng1.int(0, 100))
      const sequence2 = Array.from({ length: 10 }, () => rng2.int(0, 100))

      expect(sequence1).toEqual(sequence2)
    })

    it('should handle single value range', () => {
      const rng = new Random(123)
      expect(rng.int(5, 5)).toBe(5)
      expect(rng.int(10, 10)).toBe(10)
    })

    it('should work with negative ranges', () => {
      const rng = new Random(456)
      for (let i = 0; i < 50; i++) {
        const value = rng.int(-10, -1)
        expect(value).toBeGreaterThanOrEqual(-10)
        expect(value).toBeLessThanOrEqual(-1)
      }
    })

    it('should include both min and max values', () => {
      const rng = new Random(888)
      const values = Array.from({ length: 1000 }, () => rng.int(1, 3))

      expect(values).toContain(1)
      expect(values).toContain(2)
      expect(values).toContain(3)
    })
  })

  describe('float()', () => {
    it('should generate floats in specified range', () => {
      const rng = new Random(12345)
      for (let i = 0; i < 100; i++) {
        const value = rng.float(0, 10)
        expect(value).toBeGreaterThanOrEqual(0)
        expect(value).toBeLessThan(10)
      }
    })

    it('should generate reproducible float sequence', () => {
      const rng1 = new Random(555)
      const rng2 = new Random(555)

      const sequence1 = Array.from({ length: 10 }, () => rng1.float(0, 100))
      const sequence2 = Array.from({ length: 10 }, () => rng2.float(0, 100))

      expect(sequence1).toEqual(sequence2)
    })

    it('should work with negative ranges', () => {
      const rng = new Random(666)
      for (let i = 0; i < 50; i++) {
        const value = rng.float(-5.5, -1.5)
        expect(value).toBeGreaterThanOrEqual(-5.5)
        expect(value).toBeLessThan(-1.5)
      }
    })
  })

  describe('pick()', () => {
    it('should pick random element from array', () => {
      const rng = new Random(12345)
      const array = [1, 2, 3, 4, 5]
      const picked = rng.pick(array)
      expect(array).toContain(picked)
    })

    it('should return undefined for empty array', () => {
      const rng = new Random(123)
      expect(rng.pick([])).toBeUndefined()
    })

    it('should return only element for single-element array', () => {
      const rng = new Random(456)
      expect(rng.pick([42])).toBe(42)
    })

    it('should generate reproducible picks', () => {
      const array = ['a', 'b', 'c', 'd', 'e']
      const rng1 = new Random(789)
      const rng2 = new Random(789)

      const picks1 = Array.from({ length: 10 }, () => rng1.pick(array))
      const picks2 = Array.from({ length: 10 }, () => rng2.pick(array))

      expect(picks1).toEqual(picks2)
    })

    it('should eventually pick all elements', () => {
      const rng = new Random(999)
      const array = [1, 2, 3, 4, 5]
      const picked = new Set<number>()

      for (let i = 0; i < 100; i++) {
        const value = rng.pick(array)
        if (value !== undefined) {
          picked.add(value)
        }
      }

      expect(picked.size).toBe(5)
    })
  })

  describe('shuffle()', () => {
    it('should shuffle array', () => {
      const rng = new Random(12345)
      const array = [1, 2, 3, 4, 5]
      const shuffled = rng.shuffle(array)

      expect(shuffled).toHaveLength(array.length)
      expect(shuffled.sort()).toEqual(array.sort())
    })

    it('should not mutate original array', () => {
      const rng = new Random(123)
      const array = [1, 2, 3, 4, 5]
      const original = [...array]
      rng.shuffle(array)

      expect(array).toEqual(original)
    })

    it('should generate reproducible shuffles', () => {
      const array = [1, 2, 3, 4, 5, 6, 7, 8]
      const rng1 = new Random(444)
      const rng2 = new Random(444)

      const shuffle1 = rng1.shuffle(array)
      const shuffle2 = rng2.shuffle(array)

      expect(shuffle1).toEqual(shuffle2)
    })

    it('should handle empty array', () => {
      const rng = new Random(123)
      expect(rng.shuffle([])).toEqual([])
    })

    it('should handle single element array', () => {
      const rng = new Random(456)
      expect(rng.shuffle([42])).toEqual([42])
    })

    it('should produce different orderings', () => {
      const rng = new Random(777)
      const array = [1, 2, 3, 4, 5, 6, 7, 8]
      const shuffles = new Set<string>()

      for (let i = 0; i < 20; i++) {
        shuffles.add(JSON.stringify(rng.shuffle(array)))
      }

      expect(shuffles.size).toBeGreaterThan(1)
    })
  })

  describe('bool()', () => {
    it('should generate boolean values', () => {
      const rng = new Random(12345)
      for (let i = 0; i < 50; i++) {
        const value = rng.bool()
        expect(typeof value).toBe('boolean')
      }
    })

    it('should generate reproducible boolean sequence', () => {
      const rng1 = new Random(321)
      const rng2 = new Random(321)

      const sequence1 = Array.from({ length: 20 }, () => rng1.bool())
      const sequence2 = Array.from({ length: 20 }, () => rng2.bool())

      expect(sequence1).toEqual(sequence2)
    })

    it('should generate approximately 50% true with default probability', () => {
      const rng = new Random(999)
      const results = Array.from({ length: 1000 }, () => rng.bool())
      const trueCount = results.filter((v) => v).length

      expect(trueCount).toBeGreaterThan(400)
      expect(trueCount).toBeLessThan(600)
    })

    it('should respect custom probability', () => {
      const rng = new Random(888)
      const results = Array.from({ length: 1000 }, () => rng.bool(0.8))
      const trueCount = results.filter((v) => v).length

      // With 0.8 probability, expect ~800 true values
      expect(trueCount).toBeGreaterThan(700)
      expect(trueCount).toBeLessThan(900)
    })

    it('should always return false with 0 probability', () => {
      const rng = new Random(123)
      for (let i = 0; i < 20; i++) {
        expect(rng.bool(0)).toBe(false)
      }
    })

    it('should always return true with 1 probability', () => {
      const rng = new Random(456)
      for (let i = 0; i < 20; i++) {
        expect(rng.bool(1)).toBe(true)
      }
    })
  })

  describe('reset()', () => {
    it('should reset generator to initial state', () => {
      const rng = new Random(12345)
      const first = rng.random()
      rng.random() // Generate a few more
      rng.random()

      rng.reset(12345)
      const second = rng.random()

      expect(second).toBe(first)
    })

    it('should reset to different seed', () => {
      const rng = new Random(123)
      const sequence1 = Array.from({ length: 5 }, () => rng.random())

      rng.reset(456)
      const sequence2 = Array.from({ length: 5 }, () => rng.random())

      expect(sequence1).not.toEqual(sequence2)
    })

    it('should throw error for zero seed', () => {
      const rng = new Random(123)
      expect(() => rng.reset(0)).toThrow('Seed cannot be zero')
    })
  })

  describe('random() factory function', () => {
    it('should create Random instance', () => {
      const rng = random(12345)
      expect(rng).toBeInstanceOf(Random)
    })

    it('should create reproducible generator', () => {
      const rng1 = random(777)
      const rng2 = random(777)

      expect(rng1.random()).toBe(rng2.random())
    })
  })
})
