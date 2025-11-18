import { describe, expect, it } from 'vitest'
import { toArray } from './to-array'

describe('toArray', () => {
  it('should wrap a single number in an array', () => {
    const result = toArray(5)
    expect(result).toEqual([5])
  })

  it('should wrap a single string in an array', () => {
    const result = toArray('hello')
    expect(result).toEqual(['hello'])
  })

  it('should wrap a single object in an array', () => {
    const obj = { id: 1 }
    const result = toArray(obj)
    expect(result).toEqual([obj])
  })

  it('should return array as-is', () => {
    const array = [1, 2, 3]
    const result = toArray(array)

    expect(result).toBe(array)
    expect(result).toEqual([1, 2, 3])
  })

  it('should return empty array for null', () => {
    const result = toArray(null)
    expect(result).toEqual([])
  })

  it('should return empty array for undefined', () => {
    const result = toArray(undefined)
    expect(result).toEqual([])
  })

  it('should handle boolean values', () => {
    expect(toArray(true)).toEqual([true])
    expect(toArray(false)).toEqual([false])
  })

  it('should handle zero', () => {
    const result = toArray(0)
    expect(result).toEqual([0])
  })

  it('should handle empty string', () => {
    const result = toArray('')
    expect(result).toEqual([''])
  })

  it('should handle arrays of strings', () => {
    const array = ['a', 'b', 'c']
    const result = toArray(array)

    expect(result).toBe(array)
    expect(result).toEqual(['a', 'b', 'c'])
  })

  it('should handle arrays of objects', () => {
    const array = [{ id: 1 }, { id: 2 }]
    const result = toArray(array)

    expect(result).toBe(array)
    expect(result).toEqual([{ id: 1 }, { id: 2 }])
  })

  it('should handle nested arrays', () => {
    const array = [
      [1, 2],
      [3, 4],
    ]
    const result = toArray(array)

    expect(result).toBe(array)
    expect(result).toEqual([
      [1, 2],
      [3, 4],
    ])
  })

  it('should handle empty arrays', () => {
    const array: number[] = []
    const result = toArray(array)

    expect(result).toBe(array)
    expect(result).toEqual([])
  })

  it('should handle functions', () => {
    const fn = () => 42
    const result = toArray(fn)

    expect(result).toEqual([fn])
    expect(result[0]()).toBe(42)
  })

  it('should handle dates', () => {
    const date = new Date('2024-01-01')
    const result = toArray(date)

    expect(result).toEqual([date])
  })

  it('should handle regex', () => {
    const regex = /test/
    const result = toArray(regex)

    expect(result).toEqual([regex])
  })

  it('should preserve type for arrays', () => {
    const numbers: number[] = [1, 2, 3]
    const result: number[] = toArray(numbers)

    expect(result).toEqual([1, 2, 3])
  })

  it('should work with union types', () => {
    const value: string | string[] = 'test'
    const result = toArray(value)

    expect(result).toEqual(['test'])
  })

  it('should work with union types as array', () => {
    const value: string | string[] = ['a', 'b']
    const result = toArray(value)

    expect(result).toEqual(['a', 'b'])
  })

  it('should handle symbols', () => {
    const sym = Symbol('test')
    const result = toArray(sym)

    expect(result).toEqual([sym])
  })

  it('should handle BigInt', () => {
    const bigInt = BigInt(9007199254740991)
    const result = toArray(bigInt)

    expect(result).toEqual([bigInt])
  })
})
