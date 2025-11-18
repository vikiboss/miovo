import { beforeEach, describe, expect, it, vi } from 'vitest'
import { retry } from './retry'

describe('retry', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  it('should return result on first success', async () => {
    const fn = vi.fn().mockResolvedValue('success')
    const promise = retry(fn, { attempts: 3 })

    await promise

    expect(fn).toHaveBeenCalledTimes(1)
    expect(await promise).toBe('success')
  })

  it('should retry on failure', async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new Error('fail1'))
      .mockRejectedValueOnce(new Error('fail2'))
      .mockResolvedValue('success')

    const promise = retry(fn, { attempts: 3, delay: 1000 })

    // First attempt fails immediately
    await vi.advanceTimersByTimeAsync(0)

    // Wait for first retry delay
    await vi.advanceTimersByTimeAsync(1000)

    // Wait for second retry delay
    await vi.advanceTimersByTimeAsync(1000)

    expect(fn).toHaveBeenCalledTimes(3)
    expect(await promise).toBe('success')
  })

  it('should throw error after all attempts exhausted', async () => {
    const error = new Error('persistent failure')
    const fn = vi.fn().mockRejectedValue(error)

    const promise = retry(fn, { attempts: 3, delay: 100 })

    // Advance timers and catch any rejections
    const advancePromise = Promise.all([
      vi.advanceTimersByTimeAsync(0),
      vi.advanceTimersByTimeAsync(100),
      vi.advanceTimersByTimeAsync(100),
    ])

    await Promise.all([advancePromise, expect(promise).rejects.toThrow('persistent failure')])
    expect(fn).toHaveBeenCalledTimes(3)
  })

  it('should use exponential backoff', async () => {
    const fn = vi.fn().mockRejectedValue(new Error('fail'))

    const promise = retry(fn, { attempts: 4, delay: 100, backoff: 2 })
    const expectPromise = expect(promise).rejects.toThrow('fail')

    await vi.advanceTimersByTimeAsync(0) // First attempt
    expect(fn).toHaveBeenCalledTimes(1)

    await vi.advanceTimersByTimeAsync(100) // Delay: 100ms (100 * 2^0)
    expect(fn).toHaveBeenCalledTimes(2)

    await vi.advanceTimersByTimeAsync(200) // Delay: 200ms (100 * 2^1)
    expect(fn).toHaveBeenCalledTimes(3)

    await vi.advanceTimersByTimeAsync(400) // Delay: 400ms (100 * 2^2)
    expect(fn).toHaveBeenCalledTimes(4)

    await expectPromise
  })

  it('should respect maxDelay', async () => {
    const fn = vi.fn().mockRejectedValue(new Error('fail'))

    const promise = retry(fn, { attempts: 4, delay: 100, backoff: 2, maxDelay: 250 })
    const expectPromise = expect(promise).rejects.toThrow('fail')

    await vi.advanceTimersByTimeAsync(0) // First attempt
    await vi.advanceTimersByTimeAsync(100) // Delay: 100ms
    await vi.advanceTimersByTimeAsync(200) // Delay: 200ms
    await vi.advanceTimersByTimeAsync(250) // Delay: 250ms (capped from 400ms)

    expect(fn).toHaveBeenCalledTimes(4)
    await expectPromise
  })

  it('should use shouldRetry predicate', async () => {
    const error503 = Object.assign(new Error('Service Unavailable'), { status: 503 })
    const error404 = Object.assign(new Error('Not Found'), { status: 404 })

    const fn = vi.fn().mockRejectedValueOnce(error503).mockRejectedValueOnce(error404)

    const promise = retry(fn, {
      attempts: 3,
      delay: 100,
      shouldRetry: (error: any) => error.status === 503,
    })
    const expectPromise = expect(promise).rejects.toMatchObject({ status: 404 })

    await vi.advanceTimersByTimeAsync(0) // First attempt (503)
    await vi.advanceTimersByTimeAsync(100) // Retry

    // Should stop retrying on 404
    await expectPromise
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('should pass attempt number to shouldRetry', async () => {
    const fn = vi.fn().mockRejectedValue(new Error('fail'))
    const shouldRetry = vi.fn().mockReturnValue(true)

    const promise = retry(fn, { attempts: 3, delay: 100, shouldRetry })
    const expectPromise = expect(promise).rejects.toThrow('fail')

    await vi.advanceTimersByTimeAsync(0)
    await vi.advanceTimersByTimeAsync(100)
    await vi.advanceTimersByTimeAsync(100)

    await expectPromise

    expect(shouldRetry).toHaveBeenCalledTimes(2)
    expect(shouldRetry).toHaveBeenNthCalledWith(1, expect.any(Error), 1)
    expect(shouldRetry).toHaveBeenNthCalledWith(2, expect.any(Error), 2)
  })

  it('should use default options', async () => {
    const fn = vi.fn().mockResolvedValue('success')
    const promise = retry(fn)

    await promise

    expect(fn).toHaveBeenCalledTimes(1)
    expect(await promise).toBe('success')
  })
})
