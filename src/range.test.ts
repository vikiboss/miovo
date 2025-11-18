import { describe, expect, it } from 'vitest'
import { range } from './range'

describe('range', () => {
  it('should generate ascending range with default step', () => {
    expect(range(0, 5)).toEqual([0, 1, 2, 3, 4])
    expect(range(1, 6)).toEqual([1, 2, 3, 4, 5])
    expect(range(10, 15)).toEqual([10, 11, 12, 13, 14])
  })

  it('should generate ascending range with custom step', () => {
    expect(range(0, 10, 2)).toEqual([0, 2, 4, 6, 8])
    expect(range(0, 10, 3)).toEqual([0, 3, 6, 9])
    expect(range(1, 10, 2)).toEqual([1, 3, 5, 7, 9])
  })

  it('should generate descending range with default step', () => {
    expect(range(5, 0)).toEqual([5, 4, 3, 2, 1])
    expect(range(10, 5)).toEqual([10, 9, 8, 7, 6])
  })

  it('should generate descending range with custom step', () => {
    expect(range(10, 0, -2)).toEqual([10, 8, 6, 4, 2])
    expect(range(10, 0, -3)).toEqual([10, 7, 4, 1])
  })

  it('should handle equal start and end', () => {
    expect(range(0, 0)).toEqual([])
    expect(range(5, 5)).toEqual([])
    expect(range(-3, -3)).toEqual([])
  })

  it('should handle single element range', () => {
    expect(range(0, 1)).toEqual([0])
    expect(range(5, 6)).toEqual([5])
    expect(range(10, 9)).toEqual([10])
  })

  it('should work with negative numbers', () => {
    expect(range(-5, 0)).toEqual([-5, -4, -3, -2, -1])
    expect(range(0, -5)).toEqual([0, -1, -2, -3, -4])
    expect(range(-10, -5)).toEqual([-10, -9, -8, -7, -6])
  })

  it('should work with decimal steps', () => {
    expect(range(0, 1, 0.2)).toEqual([0, 0.2, 0.4, 0.6000000000000001, 0.8])
    expect(range(0, 2, 0.5)).toEqual([0, 0.5, 1, 1.5])
  })

  it('should throw error for zero step', () => {
    expect(() => range(0, 10, 0)).toThrow('Step cannot be zero')
  })

  it('should throw error for wrong step direction', () => {
    expect(() => range(0, 10, -1)).toThrow('Step direction must match range direction')
    expect(() => range(10, 0, 1)).toThrow('Step direction must match range direction')
  })

  it('should handle large ranges efficiently', () => {
    const result = range(0, 1000)
    expect(result).toHaveLength(1000)
    expect(result[0]).toBe(0)
    expect(result[999]).toBe(999)
  })
})
