import { describe, expect, it } from 'vitest'
import { match } from './match'

describe('match', () => {
  it('should match exact values', () => {
    const result = match(2).case(1, 'one').case(2, 'two').case(3, 'three').default('other')

    expect(result).toBe('two')
  })

  it('should use default when no match', () => {
    const result = match(5).case(1, 'one').case(2, 'two').default('other')

    expect(result).toBe('other')
  })

  it('should work with functions as handlers', () => {
    const result = match(2)
      .case(1, () => 'ONE')
      .case(2, (v) => `Value is ${v}`)
      .default(() => 'OTHER')

    expect(result).toBe('Value is 2')
  })

  it('should work with predicate functions', () => {
    const result = match(15)
      .case((v) => v < 10, 'small')
      .case((v) => v >= 10 && v < 20, 'medium')
      .case((v) => v >= 20, 'large')
      .default('unknown')

    expect(result).toBe('medium')
  })

  it('should match first case when multiple match', () => {
    const result = match(5)
      .case((v) => v > 0, 'positive')
      .case((v) => v < 10, 'small')
      .default('other')

    expect(result).toBe('positive')
  })

  it('should work with strings', () => {
    const result = match('hello').case('hi', 'greeting1').case('hello', 'greeting2').default('unknown')

    expect(result).toBe('greeting2')
  })

  it('should throw without default and no match', () => {
    expect(() => {
      match(999).case(1, 'one').case(2, 'two').run()
    }).toThrow('No matching case and no default handler')
  })

  it('should work with objects', () => {
    const result = match({ type: 'user' })
      .case((v) => v.type === 'admin', 'Admin user')
      .case((v) => v.type === 'user', 'Regular user')
      .default('Unknown')

    expect(result).toBe('Regular user')
  })
})
