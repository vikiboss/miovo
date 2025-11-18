import { describe, expect, it } from 'vitest'
import { randomId } from './random-id'

describe('randomId', () => {
  it('should return a string', () => {
    expect(typeof randomId()).toBe('string')
  })

  it('should have default length of 16', () => {
    expect(randomId().length).toBe(16)
  })

  it('should respect custom length', () => {
    expect(randomId(8).length).toBe(8)
    expect(randomId(32).length).toBe(32)
    expect(randomId(1).length).toBe(1)
  })

  it('should only contain alphanumeric characters', () => {
    const id = randomId(1000)
    const validChars = /^[A-Za-z0-9]+$/

    expect(id).toMatch(validChars)
  })

  it('should generate unique IDs', () => {
    const ids = new Set<string>()

    for (let i = 0; i < 1000; i++) {
      ids.add(randomId())
    }

    expect(ids.size).toBe(1000)
  })

  it('should generate different IDs on consecutive calls', () => {
    const id1 = randomId()
    const id2 = randomId()
    const id3 = randomId()

    expect(id1).not.toBe(id2)
    expect(id2).not.toBe(id3)
    expect(id1).not.toBe(id3)
  })

  it('should handle zero length', () => {
    expect(randomId(0)).toBe('')
  })

  it('should handle very short length', () => {
    const id = randomId(1)
    expect(id.length).toBe(1)
    expect(id).toMatch(/[A-Za-z0-9]/)
  })

  it('should handle very long length', () => {
    const id = randomId(1000)
    expect(id.length).toBe(1000)
  })

  it('should have good character distribution', () => {
    const id = randomId(10000)
    const hasUpperCase = /[A-Z]/.test(id)
    const hasLowerCase = /[a-z]/.test(id)
    const hasDigit = /[0-9]/.test(id)

    expect(hasUpperCase).toBe(true)
    expect(hasLowerCase).toBe(true)
    expect(hasDigit).toBe(true)
  })

  describe('with seed', () => {
    it('should generate reproducible IDs with same seed', () => {
      const id1 = randomId(16, 12345)
      const id2 = randomId(16, 12345)
      const id3 = randomId(16, 12345)

      expect(id1).toBe(id2)
      expect(id2).toBe(id3)
    })

    it('should generate different IDs with different seeds', () => {
      const id1 = randomId(16, 12345)
      const id2 = randomId(16, 67890)
      const id3 = randomId(16, 11111)

      expect(id1).not.toBe(id2)
      expect(id2).not.toBe(id3)
      expect(id1).not.toBe(id3)
    })

    it('should respect length with seed', () => {
      expect(randomId(8, 12345).length).toBe(8)
      expect(randomId(32, 12345).length).toBe(32)
      expect(randomId(100, 12345).length).toBe(100)
    })

    it('should generate valid alphanumeric IDs with seed', () => {
      const id = randomId(100, 12345)
      expect(id).toMatch(/^[A-Za-z0-9]+$/)
    })

    it('should generate different IDs for same seed with different lengths', () => {
      const id1 = randomId(8, 12345)
      const id2 = randomId(16, 12345)

      expect(id1).not.toBe(id2)
      expect(id2).toContain(id1) // Shorter ID should be prefix of longer
    })
  })
})
