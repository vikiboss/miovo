import { describe, expect, it } from 'vitest'
import { unique } from './unique'

describe('unique', () => {
  it('should remove duplicate numbers', () => {
    const array = [1, 2, 2, 3, 4, 4, 5]
    const result = unique(array)

    expect(result).toEqual([1, 2, 3, 4, 5])
  })

  it('should remove duplicate strings', () => {
    const array = ['apple', 'banana', 'apple', 'cherry']
    const result = unique(array)

    expect(result).toEqual(['apple', 'banana', 'cherry'])
  })

  it('should preserve order of first occurrence', () => {
    const array = [3, 1, 2, 3, 1]
    const result = unique(array)

    expect(result).toEqual([3, 1, 2])
  })

  it('should handle empty array', () => {
    const result = unique([])
    expect(result).toEqual([])
  })

  it('should handle array with no duplicates', () => {
    const array = [1, 2, 3, 4, 5]
    const result = unique(array)

    expect(result).toEqual([1, 2, 3, 4, 5])
  })

  it('should handle array with all duplicates', () => {
    const array = [1, 1, 1, 1]
    const result = unique(array)

    expect(result).toEqual([1])
  })

  it('should not modify the original array', () => {
    const array = [1, 2, 2, 3]
    const original = [...array]

    unique(array)

    expect(array).toEqual(original)
  })

  it('should work with booleans', () => {
    const array = [true, false, true, false, true]
    const result = unique(array)

    expect(result).toEqual([true, false])
  })

  it('should work with mixed types', () => {
    const array = [1, '1', 2, '2', 1, '1']
    const result = unique(array)

    expect(result).toEqual([1, '1', 2, '2'])
  })

  it('should work with null and undefined', () => {
    const array = [null, undefined, null, 1, undefined, 1]
    const result = unique(array)

    expect(result).toEqual([null, undefined, 1])
  })

  it('should use identity function for objects', () => {
    const users = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 1, name: 'Alice' },
      { id: 3, name: 'Charlie' },
    ]

    const result = unique(users, (user) => user.id)

    expect(result).toEqual([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ])
  })

  it('should support case-insensitive uniqueness with identity', () => {
    const words = ['Apple', 'banana', 'APPLE', 'Banana', 'cherry']
    const result = unique(words, (word) => word.toLowerCase())

    expect(result).toEqual(['Apple', 'banana', 'cherry'])
  })

  it('should work with complex identity functions', () => {
    const items = [
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 1, y: 2 },
      { x: 3, y: 4 },
    ]

    const result = unique(items, (item) => `${item.x},${item.y}`)

    expect(result).toEqual([
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 4 },
    ])
  })

  it('should handle identity function returning objects', () => {
    const items = [
      { id: 1, value: 'a' },
      { id: 1, value: 'b' },
      { id: 2, value: 'c' },
    ]

    const result = unique(items, (item) => item.id)

    expect(result.length).toBe(2)
    expect(result[0].id).toBe(1)
    expect(result[1].id).toBe(2)
  })

  it('should handle single element array', () => {
    const result = unique([42])
    expect(result).toEqual([42])
  })

  it('should work with nested arrays', () => {
    const arrays = [
      [1, 2],
      [3, 4],
      [1, 2],
      [5, 6],
    ]
    const result = unique(arrays, (arr) => arr.join(','))

    expect(result).toEqual([
      [1, 2],
      [3, 4],
      [5, 6],
    ])
  })

  it('should handle large arrays efficiently', () => {
    const array = Array.from({ length: 10000 }, (_, i) => i % 100)
    const result = unique(array)

    expect(result.length).toBe(100)
  })

  it('should work with readonly arrays', () => {
    const array: readonly number[] = [1, 2, 2, 3]
    const result = unique(array)

    expect(result).toEqual([1, 2, 3])
  })
})
