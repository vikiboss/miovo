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
})
