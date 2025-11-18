import { describe, expect, it } from 'vitest'
import { truncate } from './truncate'

describe('truncate', () => {
  it('should truncate strings longer than max length', () => {
    expect(truncate('Hello world', 8)).toBe('Hello...')
    expect(truncate('TypeScript is awesome', 15)).toBe('TypeScript i...')
    expect(truncate('This is a long string', 10)).toBe('This is...')
  })

  it('should return original string if shorter than max length', () => {
    expect(truncate('Short', 10)).toBe('Short')
    expect(truncate('Hi', 5)).toBe('Hi')
    expect(truncate('Test', 4)).toBe('Test')
  })

  it('should handle empty string', () => {
    expect(truncate('', 10)).toBe('')
  })

  it('should use custom suffix', () => {
    expect(truncate('Hello world', 8, '…')).toBe('Hello w…')
    expect(truncate('Long text here', 10, '>')).toBe('Long text>')
    expect(truncate('Test string', 8, ' [...]')).toBe('Te [...]')
  })

  it('should handle length equal to string length', () => {
    expect(truncate('Hello', 5)).toBe('Hello')
    expect(truncate('Test', 4)).toBe('Test')
  })

  it('should handle very short max length', () => {
    expect(truncate('Hello world', 3)).toBe('...')
    expect(truncate('Test', 2)).toBe('..')
    expect(truncate('Hi', 1)).toBe('.')
  })

  it('should handle length shorter than suffix', () => {
    expect(truncate('Hello world', 2, '...')).toBe('..')
    expect(truncate('Test', 1, '...')).toBe('.')
    expect(truncate('Hi', 0, '...')).toBe('')
  })

  it('should work with unicode characters', () => {
    expect(truncate('Hello 世界', 8)).toBe('Hello 世界') // Exactly 8 chars, no truncation
    expect(truncate('Hello 世界!', 8)).toBe('Hello...') // 9 chars -> truncate to 5 + '...' = 8
    expect(truncate('Über den Wolken', 10)).toBe('Über de...')
  })

  it('should preserve whitespace before truncation point', () => {
    expect(truncate('Hello   world', 10)).toBe('Hello  ...')
    expect(truncate('Test  string', 8)).toBe('Test ...')
  })

  it('should handle empty suffix', () => {
    expect(truncate('Hello world', 5, '')).toBe('Hello')
    expect(truncate('Test string', 4, '')).toBe('Test')
  })
})
