/**
 * Options for configuring the throttle behavior.
 */
export interface ThrottleOptions {
  /**
   * If true, invokes the function on the leading edge of the timeout.
   * @default true
   */
  leading?: boolean

  /**
   * If true, invokes the function on the trailing edge of the timeout.
   * @default true
   */
  trailing?: boolean
}

/**
 * A throttled function with additional control methods.
 */
export interface ThrottledFunction<T extends (...args: any[]) => any> {
  /**
   * The throttled function that can be called with the same arguments as the original.
   */
  (...args: Parameters<T>): ReturnType<T> | undefined

  /**
   * Cancels any pending invocations.
   */
  cancel(): void

  /**
   * Immediately invokes any pending invocation.
   */
  flush(): ReturnType<T> | undefined
}

/**
 * Creates a throttled function that only invokes the provided function at most once per
 * specified time interval. Subsequent calls to the throttled function within the wait
 * period will not trigger the original function.
 *
 * **Key Features:**
 * - Limits function execution frequency to improve performance
 * - Configurable leading and trailing edge execution
 * - Provides cancel and flush methods for fine control
 * - Preserves function context and arguments
 * - Useful for rate-limiting event handlers (scroll, resize, input)
 *
 * @template T - The type of the function to throttle
 *
 * @param func - The function to throttle
 * @param wait - The number of milliseconds to throttle invocations to
 * @param options - Configuration options for throttle behavior
 *
 * @returns A throttled version of the function with cancel and flush methods
 *
 * @example
 * Basic throttle usage:
 * ```ts
 * const throttledSave = throttle(() => {
 *   console.log('Saving...')
 * }, 1000)
 *
 * // Will only execute once per second
 * window.addEventListener('scroll', throttledSave)
 * ```
 *
 * @example
 * With leading and trailing options:
 * ```ts
 * // Execute only on leading edge
 * const throttledFn = throttle(fn, 1000, { trailing: false })
 *
 * // Execute only on trailing edge
 * const throttledFn = throttle(fn, 1000, { leading: false })
 * ```
 *
 * @example
 * Using control methods:
 * ```ts
 * const throttled = throttle(expensiveFn, 1000)
 *
 * // Cancel any pending execution
 * throttled.cancel()
 *
 * // Immediately execute pending call
 * throttled.flush()
 * ```
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options: ThrottleOptions = {},
): ThrottledFunction<T> {
  const { leading = true, trailing = true } = options

  let timeout: ReturnType<typeof setTimeout> | null = null
  let lastArgs: Parameters<T> | null = null
  let lastThis: any = null
  let result: ReturnType<T> | undefined
  let lastCallTime: number | null = null
  let lastInvokeTime = 0

  function invokeFunc(time: number): ReturnType<T> {
    const args = lastArgs!
    const thisArg = lastThis

    lastArgs = null
    lastThis = null
    lastInvokeTime = time
    result = func.apply(thisArg, args)
    return result as ReturnType<T>
  }

  function shouldInvoke(time: number): boolean {
    const timeSinceLastCall = time - (lastCallTime || 0)
    const timeSinceLastInvoke = time - lastInvokeTime

    return lastCallTime === null || timeSinceLastCall >= wait || timeSinceLastCall < 0 || timeSinceLastInvoke >= wait
  }

  function leadingEdge(time: number): ReturnType<T> | undefined {
    lastInvokeTime = time
    timeout = setTimeout(timerExpired, wait)
    return leading ? invokeFunc(time) : result
  }

  function remainingWait(time: number): number {
    const timeSinceLastCall = time - (lastCallTime || 0)
    const timeSinceLastInvoke = time - lastInvokeTime
    const timeWaiting = wait - timeSinceLastCall

    return Math.min(timeWaiting, wait - timeSinceLastInvoke)
  }

  function timerExpired(): void {
    const time = Date.now()
    if (shouldInvoke(time)) {
      trailingEdge(time)
    } else {
      timeout = setTimeout(timerExpired, remainingWait(time))
    }
  }

  function trailingEdge(time: number): ReturnType<T> | undefined {
    timeout = null

    if (trailing && lastArgs) {
      return invokeFunc(time)
    }
    lastArgs = null
    lastThis = null
    return result
  }

  function cancel(): void {
    if (timeout !== null) {
      clearTimeout(timeout)
    }
    lastInvokeTime = 0
    lastArgs = null
    lastThis = null
    lastCallTime = null
    timeout = null
  }

  function flush(): ReturnType<T> | undefined {
    return timeout === null ? result : trailingEdge(Date.now())
  }

  function throttled(this: any, ...args: Parameters<T>): ReturnType<T> | undefined {
    const time = Date.now()
    const isInvoking = shouldInvoke(time)

    lastArgs = args
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    lastThis = this
    lastCallTime = time

    if (isInvoking) {
      if (timeout === null) {
        return leadingEdge(lastCallTime)
      }
    }
    if (timeout === null) {
      timeout = setTimeout(timerExpired, wait)
    }
    return result
  }

  throttled.cancel = cancel
  throttled.flush = flush

  return throttled as ThrottledFunction<T>
}
