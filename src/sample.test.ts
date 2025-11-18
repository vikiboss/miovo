import { describe, expect, it } from 'vitest'
import { sample } from './sample'

describe('sample', () => {
  it('should return an element from the array', () => {
    const array = [1, 2, 3, 4, 5]
    const result = sample(array)

    expect(array).toContain(result)
  })

  it('should return undefined for empty array', () => {
    const result = sample([])
    expect(result).toBeUndefined()
  })

  it('should return the only element for single-element array', () => {
    const result = sample([42])
    expect(result).toBe(42)
  })

  it('should work with strings', () => {
    const array = ['a', 'b', 'c']
    const result = sample(array)

    expect(array).toContain(result)
    expect(typeof result).toBe('string')
  })

  it('should work with objects', () => {
    const array = [{ id: 1 }, { id: 2 }, { id: 3 }]
    const result = sample(array)

    expect(array).toContain(result)
  })

  it('should not modify the original array', () => {
    const array = [1, 2, 3]
    const original = [...array]

    sample(array)

    expect(array).toEqual(original)
  })

  it('should eventually return all elements with enough samples', () => {
    const array = [1, 2, 3]
    const results = new Set<number>()

    // Sample many times to ensure all elements can be returned
    for (let i = 0; i < 100; i++) {
      const result = sample(array)
      if (result !== undefined) {
        results.add(result)
      }
    }

    expect(results.size).toBe(3)
    expect(results.has(1)).toBe(true)
    expect(results.has(2)).toBe(true)
    expect(results.has(3)).toBe(true)
  })

  it('should work with readonly arrays', () => {
    const array: readonly number[] = [1, 2, 3]
    const result = sample(array)

    expect(array).toContain(result)
  })
})
