import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { debounce } from './debounce'

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should debounce a function', () => {
    const func = vi.fn()
    const debounced = debounce(func, 100)

    debounced()
    debounced()
    debounced()

    expect(func).not.toHaveBeenCalled()

    vi.advanceTimersByTime(100)
    expect(func).toHaveBeenCalledTimes(1)
  })

  it('should not invoke on leading edge by default', () => {
    const func = vi.fn()
    const debounced = debounce(func, 100)

    debounced()
    expect(func).not.toHaveBeenCalled()

    vi.advanceTimersByTime(100)
    expect(func).toHaveBeenCalledTimes(1)
  })

  it('should invoke on trailing edge by default', () => {
    const func = vi.fn()
    const debounced = debounce(func, 100)

    debounced()
    debounced()

    vi.advanceTimersByTime(100)
    expect(func).toHaveBeenCalledTimes(1)
  })

  it('should invoke on leading edge when leading is true', () => {
    const func = vi.fn()
    const debounced = debounce(func, 100, { leading: true })

    debounced()
    expect(func).toHaveBeenCalledTimes(1)

    vi.advanceTimersByTime(100)
    expect(func).toHaveBeenCalledTimes(1)
  })

  it('should not invoke on trailing edge when trailing is false', () => {
    const func = vi.fn()
    const debounced = debounce(func, 100, { leading: true, trailing: false })

    debounced()
    expect(func).toHaveBeenCalledTimes(1)

    debounced()
    vi.advanceTimersByTime(100)
    expect(func).toHaveBeenCalledTimes(1)
  })

  it('should reset the timer on each call', () => {
    const func = vi.fn()
    const debounced = debounce(func, 100)

    debounced()
    vi.advanceTimersByTime(50)

    debounced()
    vi.advanceTimersByTime(50)
    expect(func).not.toHaveBeenCalled()

    vi.advanceTimersByTime(50)
    expect(func).toHaveBeenCalledTimes(1)
  })

  it('should pass arguments to the debounced function', () => {
    const func = vi.fn()
    const debounced = debounce(func, 100)

    debounced(1, 2, 3)

    vi.advanceTimersByTime(100)
    expect(func).toHaveBeenCalledWith(1, 2, 3)
  })

  it('should use the latest arguments', () => {
    const func = vi.fn()
    const debounced = debounce(func, 100)

    debounced(1)
    debounced(2)
    debounced(3)

    vi.advanceTimersByTime(100)
    expect(func).toHaveBeenCalledWith(3)
    expect(func).toHaveBeenCalledTimes(1)
  })

  it('should preserve context', () => {
    const obj = {
      value: 42,
      method: vi.fn(function (this: any) {
        return this.value
      }),
    }

    const debounced = debounce(obj.method, 100)
    debounced.call(obj)

    vi.advanceTimersByTime(100)
    expect(obj.method).toHaveBeenCalledTimes(1)
  })

  it('should return the result of the function', () => {
    const func = vi.fn(() => 'result')
    const debounced = debounce(func, 100, { leading: true })

    const result = debounced()
    expect(result).toBe('result')
  })

  it('should cancel pending invocations', () => {
    const func = vi.fn()
    const debounced = debounce(func, 100)

    debounced()
    debounced()
    debounced.cancel()

    vi.advanceTimersByTime(100)
    expect(func).not.toHaveBeenCalled()
  })

  it('should flush pending invocations', () => {
    const func = vi.fn()
    const debounced = debounce(func, 100)

    debounced()
    expect(func).not.toHaveBeenCalled()

    debounced.flush()
    expect(func).toHaveBeenCalledTimes(1)
  })

  it('should return true from pending when there is a pending invocation', () => {
    const func = vi.fn()
    const debounced = debounce(func, 100)

    expect(debounced.pending()).toBe(false)

    debounced()
    expect(debounced.pending()).toBe(true)

    vi.advanceTimersByTime(100)
    expect(debounced.pending()).toBe(false)
  })

  it('should respect maxWait option', () => {
    const func = vi.fn()
    const debounced = debounce(func, 100, { maxWait: 200 })

    debounced()
    vi.advanceTimersByTime(50)

    debounced()
    vi.advanceTimersByTime(50)

    debounced()
    vi.advanceTimersByTime(50)

    debounced()
    vi.advanceTimersByTime(50)

    // At this point, 200ms have passed (maxWait)
    expect(func).toHaveBeenCalledTimes(1)
  })

  it('should work with zero wait time', () => {
    const func = vi.fn()
    const debounced = debounce(func, 0)

    debounced()
    expect(func).not.toHaveBeenCalled()

    vi.advanceTimersByTime(0)
    expect(func).toHaveBeenCalledTimes(1)
  })

  it('should handle both leading and trailing true', () => {
    const func = vi.fn()
    const debounced = debounce(func, 100, { leading: true, trailing: true })

    debounced()
    expect(func).toHaveBeenCalledTimes(1)

    debounced()
    vi.advanceTimersByTime(100)
    expect(func).toHaveBeenCalledTimes(2)
  })

  it('should handle rapid successive calls', () => {
    const func = vi.fn()
    const debounced = debounce(func, 100)

    for (let i = 0; i < 10; i++) {
      debounced()
      vi.advanceTimersByTime(50)
    }

    expect(func).not.toHaveBeenCalled()

    vi.advanceTimersByTime(100)
    expect(func).toHaveBeenCalledTimes(1)
  })

  it('should allow multiple invocations after wait period', () => {
    const func = vi.fn()
    const debounced = debounce(func, 100)

    debounced()
    vi.advanceTimersByTime(100)
    expect(func).toHaveBeenCalledTimes(1)

    debounced()
    vi.advanceTimersByTime(100)
    expect(func).toHaveBeenCalledTimes(2)
  })

  it('should handle cancel after leading execution', () => {
    const func = vi.fn()
    const debounced = debounce(func, 100, { leading: true })

    debounced()
    expect(func).toHaveBeenCalledTimes(1)

    debounced()
    debounced.cancel()

    vi.advanceTimersByTime(100)
    expect(func).toHaveBeenCalledTimes(1)
  })
})
