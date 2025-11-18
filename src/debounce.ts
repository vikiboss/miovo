/**
 * Options for configuring the debounce behavior.
 */
export interface DebounceOptions {
  /**
   * If true, invokes the function on the leading edge of the timeout.
   * @default false
   */
  leading?: boolean

  /**
   * If true, invokes the function on the trailing edge of the timeout.
   * @default true
   */
  trailing?: boolean

  /**
   * The maximum time the function is allowed to be delayed before it's invoked.
   * @default undefined
   */
  maxWait?: number
}

/**
 * A debounced function with additional control methods.
 */
export interface DebouncedFunction<T extends (...args: any[]) => any> {
  /**
   * The debounced function that can be called with the same arguments as the original.
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

  /**
   * Checks if there is a pending invocation.
   */
  pending(): boolean
}

/**
 * Creates a debounced function that delays invoking the provided function until after
 * the specified wait time has elapsed since the last time it was invoked.
 *
 * **Key Features:**
 * - Delays function execution until after a period of inactivity
 * - Configurable leading and trailing edge execution
 * - Optional maximum wait time to ensure execution
 * - Provides cancel, flush, and pending methods for control
 * - Useful for optimizing expensive operations (API calls, search, validation)
 *
 * @template T - The type of the function to debounce
 *
 * @param func - The function to debounce
 * @param wait - The number of milliseconds to delay
 * @param options - Configuration options for debounce behavior
 *
 * @returns A debounced version of the function with control methods
 *
 * @example
 * Basic debounce usage:
 * ```ts
 * const debouncedSearch = debounce((query: string) => {
 *   console.log('Searching for:', query)
 * }, 300)
 *
 * // Will only execute after 300ms of no calls
 * input.addEventListener('input', (e) => {
 *   debouncedSearch(e.target.value)
 * })
 * ```
 *
 * @example
 * With leading edge execution:
 * ```ts
 * const debouncedSave = debounce(save, 1000, { leading: true })
 * // Executes immediately on first call, then waits for 1s of inactivity
 * ```
 *
 * @example
 * With maximum wait time:
 * ```ts
 * const debouncedFn = debounce(fn, 1000, { maxWait: 5000 })
 * // Will execute at most every 5 seconds, even if constantly called
 * ```
 *
 * @example
 * Using control methods:
 * ```ts
 * const debounced = debounce(expensiveFn, 1000)
 *
 * // Cancel any pending execution
 * debounced.cancel()
 *
 * // Immediately execute pending call
 * debounced.flush()
 *
 * // Check if there's a pending call
 * if (debounced.pending()) {
 *   console.log('Function will be called soon')
 * }
 * ```
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options: DebounceOptions = {},
): DebouncedFunction<T> {
  const { leading = false, trailing = true, maxWait } = options

  let timeout: ReturnType<typeof setTimeout> | null = null
  let maxTimeout: ReturnType<typeof setTimeout> | null = null
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

    return (
      lastCallTime === null ||
      timeSinceLastCall >= wait ||
      timeSinceLastCall < 0 ||
      (maxWait !== undefined && timeSinceLastInvoke >= maxWait)
    )
  }

  function leadingEdge(time: number): ReturnType<T> | undefined {
    lastInvokeTime = time
    timeout = setTimeout(timerExpired, wait)

    if (maxWait !== undefined) {
      maxTimeout = setTimeout(maxTimerExpired, maxWait)
    }

    return leading ? invokeFunc(time) : result
  }

  function remainingWait(time: number): number {
    const timeSinceLastCall = time - (lastCallTime || 0)
    const timeSinceLastInvoke = time - lastInvokeTime
    const timeWaiting = wait - timeSinceLastCall

    if (maxWait !== undefined) {
      return Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
    }

    return timeWaiting
  }

  function timerExpired(): void {
    const time = Date.now()
    if (shouldInvoke(time)) {
      trailingEdge(time)
    } else {
      timeout = setTimeout(timerExpired, remainingWait(time))
    }
  }

  function maxTimerExpired(): void {
    if (lastArgs && trailing) {
      trailingEdge(Date.now())
    }
  }

  function trailingEdge(time: number): ReturnType<T> | undefined {
    timeout = null

    if (maxTimeout !== null) {
      clearTimeout(maxTimeout)
      maxTimeout = null
    }

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
    if (maxTimeout !== null) {
      clearTimeout(maxTimeout)
    }
    lastInvokeTime = 0
    lastArgs = null
    lastThis = null
    lastCallTime = null
    timeout = null
    maxTimeout = null
  }

  function flush(): ReturnType<T> | undefined {
    return timeout === null && maxTimeout === null ? result : trailingEdge(Date.now())
  }

  function pending(): boolean {
    return timeout !== null
  }

  function debounced(this: any, ...args: Parameters<T>): ReturnType<T> | undefined {
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
      if (maxWait !== undefined) {
        // Handle maxWait case
        timeout = setTimeout(timerExpired, wait)
        return invokeFunc(lastCallTime)
      }
    }

    if (timeout === null) {
      timeout = setTimeout(timerExpired, wait)
    }

    return result
  }

  debounced.cancel = cancel
  debounced.flush = flush
  debounced.pending = pending

  return debounced as DebouncedFunction<T>
}
