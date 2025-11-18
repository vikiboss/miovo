import { beforeEach, describe, expect, it, vi } from 'vitest'
import { sleep } from './sleep'

describe('sleep', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  it('should be a function', () => {
    expect(typeof sleep).toBe('function')
  })

  it('should return a promise', () => {
    const result = sleep(1000)
    expect(result).toBeInstanceOf(Promise)
    vi.advanceTimersByTime(1000)
  })

  it('should resolve after specified delay', async () => {
    const promise = sleep(1000)
    expect(vi.getTimerCount()).toBe(1)

    vi.advanceTimersByTime(999)
    expect(vi.getTimerCount()).toBe(1)

    vi.advanceTimersByTime(1)
    await promise
    expect(vi.getTimerCount()).toBe(0)
  })

  it('should work with async/await', async () => {
    const promise = sleep(1000)

    vi.advanceTimersByTime(1000)
    await promise

    expect(vi.getTimerCount()).toBe(0)
  })
})
