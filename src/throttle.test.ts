import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { throttle } from './throttle'

describe('throttle', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should throttle a function', () => {
    const func = vi.fn()
    const throttled = throttle(func, 100)

    throttled()
    throttled()
    throttled()

    expect(func).toHaveBeenCalledTimes(1)

    vi.advanceTimersByTime(100)
    expect(func).toHaveBeenCalledTimes(2)
  })

  it('should invoke on leading edge by default', () => {
    const func = vi.fn()
    const throttled = throttle(func, 100)

    throttled()
    expect(func).toHaveBeenCalledTimes(1)
  })

  it('should invoke on trailing edge by default', () => {
    const func = vi.fn()
    const throttled = throttle(func, 100)

    throttled()
    throttled()

    expect(func).toHaveBeenCalledTimes(1)

    vi.advanceTimersByTime(100)
    expect(func).toHaveBeenCalledTimes(2)
  })

  it('should not invoke on leading edge when leading is false', () => {
    const func = vi.fn()
    const throttled = throttle(func, 100, { leading: false })

    throttled()
    expect(func).not.toHaveBeenCalled()

    vi.advanceTimersByTime(100)
    expect(func).toHaveBeenCalledTimes(1)
  })

  it('should not invoke on trailing edge when trailing is false', () => {
    const func = vi.fn()
    const throttled = throttle(func, 100, { trailing: false })

    throttled()
    expect(func).toHaveBeenCalledTimes(1)

    throttled()
    vi.advanceTimersByTime(100)
    expect(func).toHaveBeenCalledTimes(1)
  })

  it('should pass arguments to the throttled function', () => {
    const func = vi.fn()
    const throttled = throttle(func, 100)

    throttled(1, 2, 3)
    expect(func).toHaveBeenCalledWith(1, 2, 3)
  })

  it('should preserve context', () => {
    const obj = {
      value: 42,
      method: vi.fn(function (this: any) {
        return this.value
      }),
    }

    const throttled = throttle(obj.method, 100)
    throttled.call(obj)

    expect(obj.method).toHaveBeenCalledTimes(1)
  })

  it('should return the result of the function', () => {
    const func = vi.fn(() => 'result')
    const throttled = throttle(func, 100)

    const result = throttled()
    expect(result).toBe('result')
  })

  it('should cancel pending invocations', () => {
    const func = vi.fn()
    const throttled = throttle(func, 100)

    throttled()
    throttled()
    throttled.cancel()

    vi.advanceTimersByTime(100)
    expect(func).toHaveBeenCalledTimes(1)
  })

  it('should flush pending invocations', () => {
    const func = vi.fn()
    const throttled = throttle(func, 100)

    throttled()
    throttled()

    expect(func).toHaveBeenCalledTimes(1)

    throttled.flush()
    expect(func).toHaveBeenCalledTimes(2)
  })

  it('should handle multiple invocations over time', () => {
    const func = vi.fn()
    const throttled = throttle(func, 100)

    throttled() // t=0, invoked (leading)
    expect(func).toHaveBeenCalledTimes(1)

    throttled() // t=0, queued

    vi.advanceTimersByTime(50)
    throttled() // t=50, still queued

    vi.advanceTimersByTime(50) // t=100, invoked (trailing)
    expect(func).toHaveBeenCalledTimes(2)

    vi.advanceTimersByTime(50)
    throttled() // t=150, invoked (leading)
    expect(func).toHaveBeenCalledTimes(3)
  })

  it('should use the latest arguments', () => {
    const func = vi.fn()
    const throttled = throttle(func, 100)

    throttled(1)
    throttled(2)
    throttled(3)

    expect(func).toHaveBeenCalledWith(1)

    vi.advanceTimersByTime(100)
    expect(func).toHaveBeenLastCalledWith(3)
  })

  it('should work with zero wait time', () => {
    const func = vi.fn()
    const throttled = throttle(func, 0)

    throttled()
    expect(func).toHaveBeenCalledTimes(1)

    throttled()
    vi.advanceTimersByTime(0)
    expect(func).toHaveBeenCalledTimes(2)
  })

  it('should handle both leading and trailing false', () => {
    const func = vi.fn()
    const throttled = throttle(func, 100, { leading: false, trailing: false })

    throttled()
    expect(func).not.toHaveBeenCalled()

    vi.advanceTimersByTime(100)
    expect(func).not.toHaveBeenCalled()
  })

  it('should reset after wait period', () => {
    const func = vi.fn()
    const throttled = throttle(func, 100)

    throttled()
    expect(func).toHaveBeenCalledTimes(1)

    vi.advanceTimersByTime(200)

    throttled()
    expect(func).toHaveBeenCalledTimes(2)
  })

  it('should handle rapid successive calls', () => {
    const func = vi.fn()
    const throttled = throttle(func, 100)

    for (let i = 0; i < 10; i++) {
      throttled()
    }

    expect(func).toHaveBeenCalledTimes(1)

    vi.advanceTimersByTime(100)
    expect(func).toHaveBeenCalledTimes(2)
  })
})
