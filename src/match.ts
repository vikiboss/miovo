/**
 * Function that takes a value and returns a result
 */
export type CaseFn<T = any, R = any> = (v: T) => R

/**
 * Predicate function that takes a value and returns a boolean
 */
export type PredicateFn<T = any> = (v: T) => boolean

/**
 * Match builder interface for fluent API
 */
export interface MatchBuilder<T, R> {
  /**
   * Add a case to match against (with function handler)
   */
  case(pattern: T | PredicateFn<T>, handler: (v: T) => R): MatchBuilder<T, R>
  /**
   * Add a case to match against (with direct value)
   */
  case(pattern: T | PredicateFn<T>, handler: R): MatchBuilder<T, R>
  /**
   * Add a default case handler (with function)
   */
  default(handler: (v: T) => R): R
  /**
   * Add a default case handler (with direct value)
   */
  default(handler: R): R
  /**
   * Execute the match and return the result
   */
  run(): R
}

/**
 * Pattern matching utility similar to Rust's match expression.
 *
 * @example
 * ```ts
 * const result = match(value)
 *   .case(1, () => 'one')
 *   .case(2, () => 'two')
 *   .default(() => 'other')
 * ```
 */
export function match<T, R = any>(value: T): MatchBuilder<T, R> {
  const cases: Array<{
    predicate: PredicateFn<T> | T
    handler: ((v: T) => R) | R
  }> = []
  let defaultHandler: ((v: T) => R) | R | undefined

  return {
    case(pattern: T | PredicateFn<T>, handler: ((v: T) => R) | R) {
      cases.push({ predicate: pattern, handler })
      return this
    },
    default(handler: ((v: T) => R) | R) {
      defaultHandler = handler
      return this.run()
    },
    run(): R {
      for (const { predicate, handler } of cases) {
        const matches = typeof predicate === 'function' ? (predicate as PredicateFn<T>)(value) : predicate === value

        if (matches) {
          return typeof handler === 'function' ? (handler as (v: T) => R)(value) : handler
        }
      }

      if (defaultHandler !== undefined) {
        return typeof defaultHandler === 'function' ? (defaultHandler as (v: T) => R)(value) : defaultHandler
      }

      throw new Error('No matching case and no default handler')
    },
  }
}
