import { describe, expect, it } from 'vitest'
import { shuffle } from './shuffle'

describe('shuffle', () => {
  it('should return array with same length', () => {
    const arr = [1, 2, 3, 4, 5]
    const shuffled = shuffle(arr)
    expect(shuffled).toHaveLength(arr.length)
  })

  it('should contain all original elements', () => {
    const arr = [1, 2, 3, 4, 5]
    const shuffled = shuffle(arr)
    expect(shuffled.sort()).toEqual(arr.sort())
  })

  it('should not mutate original array', () => {
    const arr = [1, 2, 3, 4, 5]
    const original = [...arr]
    shuffle(arr)
    expect(arr).toEqual(original)
  })

  it('should handle empty array', () => {
    expect(shuffle([])).toEqual([])
  })

  it('should handle single element', () => {
    expect(shuffle([1])).toEqual([1])
    expect(shuffle(['a'])).toEqual(['a'])
  })

  it('should handle two elements', () => {
    const arr = [1, 2]
    const shuffled = shuffle(arr)
    expect(shuffled).toHaveLength(2)
    expect(shuffled.includes(1)).toBe(true)
    expect(shuffled.includes(2)).toBe(true)
  })

  it('should produce different results (probabilistic)', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8]
    const results = new Set<string>()

    // Run shuffle 20 times and collect unique results
    for (let i = 0; i < 20; i++) {
      results.add(JSON.stringify(shuffle(arr)))
    }

    // With 8 elements, we should get multiple different orderings
    // (probability of all 20 being identical is astronomically low)
    expect(results.size).toBeGreaterThan(1)
  })

  it('should work with different data types', () => {
    const strings = ['a', 'b', 'c']
    const shuffledStrings = shuffle(strings)
    expect(shuffledStrings.sort()).toEqual(strings.sort())

    const objects = [{ id: 1 }, { id: 2 }, { id: 3 }]
    const shuffledObjects = shuffle(objects)
    expect(shuffledObjects).toHaveLength(3)
    expect(shuffledObjects.map((o) => o.id).sort()).toEqual([1, 2, 3])
  })

  it('should work with readonly arrays', () => {
    const readonly: readonly number[] = [1, 2, 3, 4]
    const shuffled = shuffle(readonly)
    expect(shuffled.sort()).toEqual([1, 2, 3, 4])
  })
})
