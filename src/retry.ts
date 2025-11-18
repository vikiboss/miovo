import { wait } from './wait'

/**
 * Options for the retry function.
 */
export interface RetryOptions {
  /**
   * Maximum number of retry attempts (default: 3)
   */
  attempts?: number

  /**
   * Delay between retries in milliseconds (default: 1000)
   */
  delay?: number

  /**
   * Exponential backoff multiplier (default: 1, no backoff)
   * - 1: constant delay
   * - 2: exponential (delay * 2^attempt)
   */
  backoff?: number

  /**
   * Maximum delay in milliseconds for exponential backoff (default: Infinity)
   */
  maxDelay?: number

  /**
   * Function to determine if error should trigger retry (default: always retry)
   */
  shouldRetry?: (error: unknown, attempt: number) => boolean
}

/**
 * Retries an async function with configurable attempts, delay, and backoff.
 *
 * **Key Features:**
 * - Configurable retry attempts and delay
 * - Exponential backoff support
 * - Maximum delay cap
 * - Conditional retry with shouldRetry predicate
 * - Type-safe with generics
 *
 * @param fn - Async function to retry
 * @param options - Retry configuration options
 *
 * @returns Promise that resolves with function result or rejects with last error
 *
 * @example
 * Basic usage:
 * ```ts
 * const data = await retry(
 *   async () => await fetch('/api/data').then(r => r.json()),
 *   { attempts: 3, delay: 1000 }
 * )
 * ```
 *
 * @example
 * With exponential backoff:
 * ```ts
 * const result = await retry(
 *   async () => await fetchData(),
 *   { attempts: 5, delay: 1000, backoff: 2, maxDelay: 10000 }
 * )
 * // Delays: 1s, 2s, 4s, 8s, 10s (capped)
 * ```
 *
 * @example
 * Conditional retry:
 * ```ts
 * const result = await retry(
 *   async () => await fetchData(),
 *   {
 *     attempts: 3,
 *     shouldRetry: (error) => error.status === 503 // Only retry on 503
 *   }
 * )
 * ```
 */
export async function retry<T>(fn: () => Promise<T>, options: RetryOptions = {}): Promise<T> {
  const { attempts = 3, delay = 1000, backoff = 1, maxDelay = Infinity, shouldRetry = () => true } = options

  let lastError: unknown

  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error

      const isLastAttempt = attempt === attempts - 1
      if (isLastAttempt || !shouldRetry(error, attempt + 1)) {
        throw error
      }

      // Calculate delay with exponential backoff
      const currentDelay = Math.min(delay * backoff ** attempt, maxDelay)
      await wait(currentDelay)
    }
  }

  throw lastError
}
