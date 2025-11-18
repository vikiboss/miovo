/**
 * Creates a promise that resolves after a specified delay.
 *
 * **Key Features:**
 * - Promise-based delay/sleep
 * - Works with async/await
 * - Useful for rate limiting, retries, and animations
 *
 * @param ms - Milliseconds to wait
 *
 * @returns Promise that resolves after the delay
 *
 * @example
 * Basic usage:
 * ```ts
 * await wait(1000) // Wait 1 second
 * console.log('1 second passed')
 * ```
 *
 * @example
 * In async function:
 * ```ts
 * async function fetchWithRetry() {
 *   try {
 *     return await fetch('/api/data')
 *   } catch (error) {
 *     await wait(1000)
 *     return await fetch('/api/data')
 *   }
 * }
 * ```
 *
 * @example
 * Sequential delays:
 * ```ts
 * await wait(1000)
 * console.log('Step 1')
 * await wait(2000)
 * console.log('Step 2')
 * ```
 */
export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
