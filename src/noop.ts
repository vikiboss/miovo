/**
 * A no-operation function that does nothing and returns undefined.
 *
 * **Key Features:**
 * - Zero overhead
 * - Useful as default callback
 * - Type-safe
 * - Commonly used in optional callbacks
 *
 * @returns undefined
 *
 * @example
 * Basic usage:
 * ```ts
 * noop()                      // Returns: undefined
 * ```
 *
 * @example
 * As default callback:
 * ```ts
 * function fetchData(onSuccess = noop, onError = noop) {
 *   fetch('/api/data')
 *     .then(onSuccess)
 *     .catch(onError)
 * }
 * ```
 *
 * @example
 * In event handlers:
 * ```ts
 * const handler = isDebugMode ? console.log : noop
 * element.addEventListener('click', handler)
 * ```
 */
export const noop = (): void => {}
