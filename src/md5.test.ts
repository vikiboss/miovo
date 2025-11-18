import { describe, expect, it } from 'vitest'
import { md5 } from './md5'

describe('md5', () => {
  it('should generate correct MD5 hash', () => {
    expect(md5('hello')).toBe('5d41402abc4b2a76b9719d911017c592')
    expect(md5('world')).toBe('7d793037a0760186574b0282f2f435e7')
  })

  it('should handle empty string', () => {
    expect(md5('')).toBe('d41d8cd98f00b204e9800998ecf8427e')
  })

  it('should handle numbers as strings', () => {
    const hash = md5('12345')
    expect(hash).toHaveLength(32)
    expect(hash).toMatch(/^[a-f0-9]+$/)
  })

  it('should be deterministic', () => {
    const hash1 = md5('test')
    const hash2 = md5('test')
    expect(hash1).toBe(hash2)
  })

  it('should produce different hashes for different inputs', () => {
    const hash1 = md5('test1')
    const hash2 = md5('test2')
    expect(hash1).not.toBe(hash2)
  })

  it('should return 32 character hex string', () => {
    const hash = md5('test')
    expect(hash).toHaveLength(32)
    expect(hash).toMatch(/^[a-f0-9]{32}$/)
  })

  it('should handle long strings', () => {
    const long = 'a'.repeat(10000)
    const hash = md5(long)
    expect(hash).toHaveLength(32)
  })

  it('should handle Unicode characters', () => {
    const hash1 = md5('Hello 世界')
    const hash2 = md5('🚀 emoji')

    expect(hash1).toHaveLength(32)
    expect(hash2).toHaveLength(32)
    expect(hash1).toMatch(/^[a-f0-9]{32}$/)
    expect(hash2).toMatch(/^[a-f0-9]{32}$/)
  })

  it('should handle special characters', () => {
    const hash = md5('!@#$%^&*()')
    expect(hash).toHaveLength(32)
    expect(hash).toMatch(/^[a-f0-9]{32}$/)
  })

  it('should handle newlines and whitespace', () => {
    const hash1 = md5('line1\nline2')
    const hash2 = md5('  spaces  ')

    expect(hash1).toHaveLength(32)
    expect(hash2).toHaveLength(32)
    expect(hash1).not.toBe(hash2)
  })

  it('should handle very long strings correctly', () => {
    const veryLong = 'x'.repeat(100000)
    const hash = md5(veryLong)

    expect(hash).toHaveLength(32)
    expect(hash).toMatch(/^[a-f0-9]{32}$/)
  })

  it('should handle strings with null bytes', () => {
    const hash = md5('before\u0000after')
    expect(hash).toHaveLength(32)
    expect(hash).toMatch(/^[a-f0-9]{32}$/)
  })

  it('should produce consistent hashes across multiple calls', () => {
    const input = 'consistency test 123'
    const hashes = Array.from({ length: 10 }, () => md5(input))

    expect(new Set(hashes).size).toBe(1)
  })

  it('should handle mixed alphanumeric strings', () => {
    const hash1 = md5('abc123')
    const hash2 = md5('ABC123')

    expect(hash1).toHaveLength(32)
    expect(hash2).toHaveLength(32)
    expect(hash1).not.toBe(hash2)
  })

  it('should handle consecutive similar inputs differently', () => {
    const hash1 = md5('test1')
    const hash2 = md5('test2')
    const hash3 = md5('test3')

    expect(hash1).not.toBe(hash2)
    expect(hash2).not.toBe(hash3)
    expect(hash1).not.toBe(hash3)
  })

  it('should work with JSON strings', () => {
    const obj = { name: 'John', age: 30, active: true }
    const json = JSON.stringify(obj)
    const hash = md5(json)

    expect(hash).toHaveLength(32)
    expect(hash).toMatch(/^[a-f0-9]{32}$/)
  })
})
