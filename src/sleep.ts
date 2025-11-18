import { wait } from './wait'

/**
 * Creates a promise that resolves after a specified delay (alias for wait).
 *
 * **Key Features:**
 * - Promise-based delay/sleep
 * - Works with async/await
 * - Identical to wait() function
 * - Familiar name for developers from other languages
 *
 * @param ms - Milliseconds to sleep
 *
 * @returns Promise that resolves after the delay
 *
 * @example
 * Basic usage:
 * ```ts
 * await sleep(1000) // Sleep 1 second
 * console.log('1 second passed')
 * ```
 *
 * @example
 * In async function:
 * ```ts
 * async function fetchWithDelay() {
 *   await sleep(500)
 *   return await fetch('/api/data')
 * }
 * ```
 */
export const sleep = wait
