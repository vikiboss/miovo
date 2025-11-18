import { describe, expectTypeOf, it } from 'vitest'
import type {
  DeepPartial,
  DeepReadonly,
  DeepRequired,
  FunctionKeys,
  IsAny,
  IsNever,
  IsUnknown,
  Mutable,
  Nullable,
  OmitByValue,
  OmitFunctions,
  PartialKeys,
  PickByValue,
  Prettify,
  RequireAtLeastOne,
  RequireKeys,
  RequireOnlyOne,
  StringToNumber,
  UnionToIntersection,
} from './types'

describe('types', () => {
  describe('DeepPartial', () => {
    it('should make all properties optional recursively', () => {
      type User = {
        name: string
        age: number
        address: {
          city: string
          zip: number
        }
      }

      type PartialUser = DeepPartial<User>

      // Valid partial objects
      expectTypeOf<{ name: string }>().toExtend<PartialUser>()
      expectTypeOf<{ address: { city: string } }>().toExtend<PartialUser>()
      expectTypeOf<{}>().toExtend<PartialUser>()
    })
  })

  describe('DeepRequired', () => {
    it('should make all properties required recursively', () => {
      type User = {
        name?: string
        age?: number
        address?: {
          city?: string
          zip?: number
        }
      }

      type RequiredUser = DeepRequired<User>

      expectTypeOf<RequiredUser>().toEqualTypeOf<{
        name: string
        age: number
        address: {
          city: string
          zip: number
        }
      }>()
    })
  })

  describe('DeepReadonly', () => {
    it('should make all properties readonly recursively', () => {
      type User = {
        name: string
        address: {
          city: string
        }
      }

      type ReadonlyUser = DeepReadonly<User>

      expectTypeOf<ReadonlyUser>().toEqualTypeOf<{
        readonly name: string
        readonly address: {
          readonly city: string
        }
      }>()
    })
  })

  describe('Mutable', () => {
    it('should remove readonly modifiers', () => {
      type User = {
        readonly name: string
        readonly age: number
      }

      type MutableUser = Mutable<User>

      expectTypeOf<MutableUser>().toEqualTypeOf<{
        name: string
        age: number
      }>()
    })
  })

  describe('Prettify', () => {
    it('should flatten intersection types', () => {
      type A = { a: string }
      type B = { b: number }
      type Combined = A & B

      type Pretty = Prettify<Combined>

      expectTypeOf<Pretty>().toEqualTypeOf<{
        a: string
        b: number
      }>()
    })
  })

  describe('UnionToIntersection', () => {
    it('should convert union to intersection', () => {
      type Union = { a: string } | { b: number }
      type Intersection = UnionToIntersection<Union>

      expectTypeOf<Intersection>().toEqualTypeOf<{ a: string } & { b: number }>()
    })
  })

  describe('PickByValue', () => {
    it('should pick properties by value type', () => {
      type User = {
        name: string
        age: number
        active: boolean
        email: string
      }

      type StringProps = PickByValue<User, string>

      expectTypeOf<StringProps>().toEqualTypeOf<{
        name: string
        email: string
      }>()
    })
  })

  describe('OmitByValue', () => {
    it('should omit properties by value type', () => {
      type User = {
        name: string
        age: number
        active: boolean
      }

      type NonStringProps = OmitByValue<User, string>

      expectTypeOf<NonStringProps>().toEqualTypeOf<{
        age: number
        active: boolean
      }>()
    })
  })

  describe('RequireKeys', () => {
    it('should make specified keys required', () => {
      type User = {
        name?: string
        age?: number
        email?: string
      }

      type UserWithName = RequireKeys<User, 'name' | 'email'>

      // Must have name and email
      expectTypeOf<{ name: string; email: string }>().toExtend<UserWithName>()
      expectTypeOf<{
        name: string
        email: string
        age: number
      }>().toExtend<UserWithName>()
    })
  })

  describe('PartialKeys', () => {
    it('should make specified keys optional', () => {
      type User = {
        name: string
        age: number
        email: string
      }

      type UserWithOptionalAge = PartialKeys<User, 'age'>

      // age is optional, name and email are required
      expectTypeOf<{
        name: string
        email: string
      }>().toExtend<UserWithOptionalAge>()
      expectTypeOf<{
        name: string
        email: string
        age: number
      }>().toExtend<UserWithOptionalAge>()
    })
  })

  describe('Nullable', () => {
    it('should make specified keys nullable', () => {
      type User = {
        name: string
        age: number
        email: string
      }

      type UserWithNullableAge = Nullable<User, 'age'>

      expectTypeOf<{
        name: string
        age: number | null
        email: string
      }>().toExtend<UserWithNullableAge>()
    })

    it('should make all keys nullable when no keys specified', () => {
      type User = {
        name: string
        age: number
      }

      type NullableUser = Nullable<User>

      expectTypeOf<{
        name: string | null
        age: number | null
      }>().toExtend<NullableUser>()
    })
  })

  describe('FunctionKeys', () => {
    it('should extract function property keys', () => {
      type User = {
        name: string
        age: number
        getName: () => string
        setName: (name: string) => void
      }

      type Methods = FunctionKeys<User>

      expectTypeOf<Methods>().toEqualTypeOf<'getName' | 'setName'>()
    })
  })

  describe('OmitFunctions', () => {
    it('should omit function properties', () => {
      type User = {
        name: string
        age: number
        getName: () => string
        setAge: (age: number) => void
      }

      type Data = OmitFunctions<User>

      expectTypeOf<Data>().toEqualTypeOf<{
        name: string
        age: number
      }>()
    })
  })

  describe('RequireAtLeastOne', () => {
    it('should require at least one of specified keys', () => {
      type Contact = {
        name: string
        email?: string
        phone?: string
      }

      type ValidContact = RequireAtLeastOne<Contact, 'email' | 'phone'>

      // Valid: has email
      expectTypeOf<{ name: string; email: string }>().toExtend<ValidContact>()

      // Valid: has phone
      expectTypeOf<{ name: string; phone: string }>().toExtend<ValidContact>()

      // Valid: has both
      expectTypeOf<{
        name: string
        email: string
        phone: string
      }>().toExtend<ValidContact>()
    })
  })

  describe('RequireOnlyOne', () => {
    it('should require exactly one of specified keys', () => {
      type Payment = {
        amount: number
        card?: string
        paypal?: string
      }

      type ValidPayment = RequireOnlyOne<Payment, 'card' | 'paypal'>

      // Valid: only card
      expectTypeOf<{ amount: number; card: string }>().toExtend<ValidPayment>()

      // Valid: only paypal
      expectTypeOf<{
        amount: number
        paypal: string
      }>().toExtend<ValidPayment>()
    })
  })

  describe('StringToNumber', () => {
    it('should convert string literal to number', () => {
      type Five = StringToNumber<'5'>
      type Ten = StringToNumber<'10'>

      expectTypeOf<Five>().toEqualTypeOf<5>()
      expectTypeOf<Ten>().toEqualTypeOf<10>()
    })
  })

  describe('IsAny', () => {
    it('should detect any type', () => {
      type Test1 = IsAny<any>
      type Test2 = IsAny<string>
      type Test3 = IsAny<unknown>

      expectTypeOf<Test1>().toEqualTypeOf<true>()
      expectTypeOf<Test2>().toEqualTypeOf<false>()
      expectTypeOf<Test3>().toEqualTypeOf<false>()
    })
  })

  describe('IsNever', () => {
    it('should detect never type', () => {
      type Test1 = IsNever<never>
      type Test2 = IsNever<string>
      type Test3 = IsNever<void>

      expectTypeOf<Test1>().toEqualTypeOf<true>()
      expectTypeOf<Test2>().toEqualTypeOf<false>()
      expectTypeOf<Test3>().toEqualTypeOf<false>()
    })
  })

  describe('IsUnknown', () => {
    it('should detect unknown type', () => {
      type Test1 = IsUnknown<unknown>
      type Test2 = IsUnknown<any>
      type Test3 = IsUnknown<string>

      expectTypeOf<Test1>().toEqualTypeOf<true>()
      expectTypeOf<Test2>().toEqualTypeOf<false>()
      expectTypeOf<Test3>().toEqualTypeOf<false>()
    })
  })
})
