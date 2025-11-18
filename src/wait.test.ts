import { describe, expect, it, vi } from 'vitest'
import { wait } from './wait'

describe('wait', () => {
  it('should return a promise', () => {
    const result = wait(0)
    expect(result).toBeInstanceOf(Promise)
  })

  it('should resolve after specified delay', async () => {
    vi.useFakeTimers()
    const promise = wait(1000)

    vi.advanceTimersByTime(999)
    await Promise.race([promise, Promise.resolve('not ready')])

    vi.advanceTimersByTime(1)
    await promise

    vi.useRealTimers()
  })

  it('should work with async/await', async () => {
    const start = Date.now()
    await wait(50)
    const elapsed = Date.now() - start

    expect(elapsed).toBeGreaterThanOrEqual(45)
  })

  it('should handle zero delay', async () => {
    await wait(0)
    // Should resolve immediately without error
  })

  it('should handle negative values as zero', async () => {
    await wait(-100)
    // Should resolve without error
  })

  it('should work in sequence', async () => {
    const results: number[] = []

    results.push(1)
    await wait(10)
    results.push(2)
    await wait(10)
    results.push(3)

    expect(results).toEqual([1, 2, 3])
  })
})
