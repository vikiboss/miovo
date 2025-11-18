import { describe, expect, it } from 'vitest'
import { hash } from './hash'

describe('hash', () => {
  it('should return a number', () => {
    const result = hash('test')
    expect(typeof result).toBe('number')
  })

  it('should return consistent hash for same input', () => {
    const str = 'hello world'
    const hash1 = hash(str)
    const hash2 = hash(str)

    expect(hash1).toBe(hash2)
  })

  it('should return different hashes for different inputs', () => {
    const hash1 = hash('abc')
    const hash2 = hash('def')

    expect(hash1).not.toBe(hash2)
  })

  it('should handle empty string', () => {
    const result = hash('')
    expect(typeof result).toBe('number')
    expect(result).toBe(5381)
  })

  it('should handle single character', () => {
    const result = hash('a')
    expect(typeof result).toBe('number')
  })

  it('should handle long strings', () => {
    const longString = 'a'.repeat(10000)
    const result = hash(longString)

    expect(typeof result).toBe('number')
  })

  it('should handle special characters', () => {
    const result = hash('!@#$%^&*()')
    expect(typeof result).toBe('number')
  })

  it('should handle unicode characters', () => {
    const result = hash('你好世界')
    expect(typeof result).toBe('number')
  })

  it('should handle emojis', () => {
    const result = hash('😀🎉🚀')
    expect(typeof result).toBe('number')
  })

  it('should produce different hashes for similar strings', () => {
    const hash1 = hash('test')
    const hash2 = hash('Test')
    const hash3 = hash('test1')

    expect(hash1).not.toBe(hash2)
    expect(hash1).not.toBe(hash3)
    expect(hash2).not.toBe(hash3)
  })

  it('should return positive 32-bit integer', () => {
    const result = hash('test')

    expect(result).toBeGreaterThanOrEqual(0)
    expect(result).toBeLessThanOrEqual(0xffffffff)
  })

  it('should handle whitespace', () => {
    const hash1 = hash('test')
    const hash2 = hash('test ')
    const hash3 = hash(' test')

    expect(hash1).not.toBe(hash2)
    expect(hash1).not.toBe(hash3)
    expect(hash2).not.toBe(hash3)
  })

  it('should work with JSON strings', () => {
    const obj = { name: 'John', age: 30 }
    const jsonStr = JSON.stringify(obj)
    const result = hash(jsonStr)

    expect(typeof result).toBe('number')
  })

  it('should have good distribution', () => {
    const hashes = new Set<number>()
    const inputs = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

    for (const input of inputs) {
      hashes.add(hash(input))
    }

    // All different inputs should produce different hashes
    expect(hashes.size).toBe(inputs.length)
  })
})
