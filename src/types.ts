/**
 * Utility types for TypeScript
 */

/**
 * Makes all properties and nested properties optional recursively.
 *
 * @example
 * ```ts
 * type User = {
 *   name: string
 *   address: {
 *     city: string
 *     zip: number
 *   }
 * }
 * type PartialUser = DeepPartial<User>
 * // { name?: string; address?: { city?: string; zip?: number } }
 * ```
 */
export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T

/**
 * Makes all properties and nested properties required recursively.
 *
 * @example
 * ```ts
 * type User = {
 *   name?: string
 *   address?: {
 *     city?: string
 *   }
 * }
 * type RequiredUser = DeepRequired<User>
 * // { name: string; address: { city: string } }
 * ```
 */
export type DeepRequired<T> = T extends object
  ? {
      [P in keyof T]-?: DeepRequired<T[P]>
    }
  : T

/**
 * Makes all properties and nested properties readonly recursively.
 *
 * @example
 * ```ts
 * type User = {
 *   name: string
 *   address: {
 *     city: string
 *   }
 * }
 * type ReadonlyUser = DeepReadonly<User>
 * // { readonly name: string; readonly address: { readonly city: string } }
 * ```
 */
export type DeepReadonly<T> = T extends object
  ? {
      readonly [P in keyof T]: DeepReadonly<T[P]>
    }
  : T

/**
 * Makes all properties mutable (removes readonly).
 *
 * @example
 * ```ts
 * type User = {
 *   readonly name: string
 *   readonly age: number
 * }
 * type MutableUser = Mutable<User>
 * // { name: string; age: number }
 * ```
 */
export type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}

/**
 * Flattens intersection types for better readability.
 *
 * @example
 * ```ts
 * type A = { a: string }
 * type B = { b: number }
 * type Combined = A & B
 * type Pretty = Prettify<Combined>
 * // { a: string; b: number }
 * ```
 */
export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

/**
 * Converts a union type to an intersection type.
 *
 * @example
 * ```ts
 * type Union = { a: string } | { b: number }
 * type Intersection = UnionToIntersection<Union>
 * // { a: string } & { b: number }
 * ```
 */
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never

/**
 * Picks properties from T whose values are assignable to V.
 *
 * @example
 * ```ts
 * type User = {
 *   name: string
 *   age: number
 *   active: boolean
 * }
 * type StringProps = PickByValue<User, string>
 * // { name: string }
 * ```
 */
export type PickByValue<T, V> = Pick<
  T,
  {
    [K in keyof T]: T[K] extends V ? K : never
  }[keyof T]
>

/**
 * Omits properties from T whose values are assignable to V.
 *
 * @example
 * ```ts
 * type User = {
 *   name: string
 *   age: number
 *   active: boolean
 * }
 * type NonStringProps = OmitByValue<User, string>
 * // { age: number; active: boolean }
 * ```
 */
export type OmitByValue<T, V> = Pick<
  T,
  {
    [K in keyof T]: T[K] extends V ? never : K
  }[keyof T]
>

/**
 * Makes certain keys required while keeping others optional.
 *
 * @example
 * ```ts
 * type User = {
 *   name?: string
 *   age?: number
 *   email?: string
 * }
 * type UserWithName = RequireKeys<User, 'name' | 'email'>
 * // { name: string; age?: number; email: string }
 * ```
 */
export type RequireKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

/**
 * Makes certain keys optional while keeping others required.
 *
 * @example
 * ```ts
 * type User = {
 *   name: string
 *   age: number
 *   email: string
 * }
 * type UserWithOptionalAge = PartialKeys<User, 'age'>
 * // { name: string; age?: number; email: string }
 * ```
 */
export type PartialKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/**
 * Makes the specified keys nullable.
 *
 * @example
 * ```ts
 * type User = {
 *   name: string
 *   age: number
 * }
 * type UserWithNullableAge = Nullable<User, 'age'>
 * // { name: string; age: number | null }
 * ```
 */
export type Nullable<T, K extends keyof T = keyof T> = Omit<T, K> & {
  [P in K]: T[P] | null
}

/**
 * Extracts keys of T whose values are functions.
 *
 * @example
 * ```ts
 * type User = {
 *   name: string
 *   getName: () => string
 *   setName: (name: string) => void
 * }
 * type Methods = FunctionKeys<User>
 * // 'getName' | 'setName'
 * ```
 */
export type FunctionKeys<T> = {
  [K in keyof T]: T[K] extends Function ? K : never
}[keyof T]

/**
 * Omits all function properties from a type.
 *
 * @example
 * ```ts
 * type User = {
 *   name: string
 *   age: number
 *   getName: () => string
 * }
 * type Data = OmitFunctions<User>
 * // { name: string; age: number }
 * ```
 */
export type OmitFunctions<T> = Omit<T, FunctionKeys<T>>

/**
 * Creates a type that must have at least one of the specified keys.
 *
 * @example
 * ```ts
 * type Contact = {
 *   name: string
 *   email?: string
 *   phone?: string
 * }
 * type ValidContact = RequireAtLeastOne<Contact, 'email' | 'phone'>
 * // Must have name and at least one of email or phone
 * ```
 */
export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
  }[Keys]

/**
 * Creates a type that can have at most one of the specified keys.
 *
 * @example
 * ```ts
 * type Payment = {
 *   amount: number
 *   card?: string
 *   paypal?: string
 *   crypto?: string
 * }
 * type ValidPayment = RequireOnlyOne<Payment, 'card' | 'paypal' | 'crypto'>
 * // Must have amount and exactly one of card, paypal, or crypto
 * ```
 */
export type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, never>>
  }[Keys]

/**
 * Converts string literal type to number.
 *
 * @example
 * ```ts
 * type Five = StringToNumber<'5'>  // 5
 * ```
 */
export type StringToNumber<S extends string> = S extends `${infer N extends number}` ? N : never

/**
 * Checks if a type is any.
 *
 * @example
 * ```ts
 * type Test1 = IsAny<any>     // true
 * type Test2 = IsAny<string>  // false
 * ```
 */
export type IsAny<T> = 0 extends 1 & T ? true : false

/**
 * Checks if a type is never.
 *
 * @example
 * ```ts
 * type Test1 = IsNever<never>  // true
 * type Test2 = IsNever<string> // false
 * ```
 */
export type IsNever<T> = [T] extends [never] ? true : false

/**
 * Checks if a type is unknown.
 *
 * @example
 * ```ts
 * type Test1 = IsUnknown<unknown> // true
 * type Test2 = IsUnknown<any>     // false
 * ```
 */
export type IsUnknown<T> = IsAny<T> extends true ? false : unknown extends T ? true : false
