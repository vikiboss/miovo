import { describe, expect, it } from 'vitest'
import { chunk } from './chunk'

describe('chunk', () => {
  it('should split array into chunks of specified size', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]])
    expect(chunk([1, 2, 3, 4], 2)).toEqual([
      [1, 2],
      [3, 4],
    ])
    expect(chunk(['a', 'b', 'c', 'd', 'e'], 3)).toEqual([
      ['a', 'b', 'c'],
      ['d', 'e'],
    ])
  })

  it('should handle chunk size of 1', () => {
    expect(chunk([1, 2, 3], 1)).toEqual([[1], [2], [3]])
    expect(chunk(['a'], 1)).toEqual([['a']])
  })

  it('should handle empty array', () => {
    expect(chunk([], 2)).toEqual([])
    expect(chunk([], 1)).toEqual([])
  })

  it('should handle chunk size larger than array length', () => {
    expect(chunk([1, 2, 3], 5)).toEqual([[1, 2, 3]])
    expect(chunk([1], 10)).toEqual([[1]])
  })

  it('should handle chunk size equal to array length', () => {
    expect(chunk([1, 2, 3], 3)).toEqual([[1, 2, 3]])
    expect(chunk([1], 1)).toEqual([[1]])
  })

  it('should work with different data types', () => {
    expect(chunk([true, false, true], 2)).toEqual([[true, false], [true]])
    expect(chunk([{ id: 1 }, { id: 2 }, { id: 3 }], 2)).toEqual([[{ id: 1 }, { id: 2 }], [{ id: 3 }]])
  })

  it('should throw error for invalid chunk size', () => {
    expect(() => chunk([1, 2, 3], 0)).toThrow('Chunk size must be at least 1')
    expect(() => chunk([1, 2, 3], -1)).toThrow('Chunk size must be at least 1')
  })

  it('should work with readonly arrays', () => {
    const readonly: readonly number[] = [1, 2, 3, 4]
    expect(chunk(readonly, 2)).toEqual([
      [1, 2],
      [3, 4],
    ])
  })
})
