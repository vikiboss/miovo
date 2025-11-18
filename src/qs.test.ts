import { describe, expect, it } from 'vitest'
import { qs } from './qs'

describe('qs', () => {
  describe('parse', () => {
    it('should parse basic query string', () => {
      expect(qs.parse('foo=bar&baz=qux')).toEqual({ foo: 'bar', baz: 'qux' })
    })

    it('should handle leading question mark', () => {
      expect(qs.parse('?foo=bar')).toEqual({ foo: 'bar' })
    })

    it('should handle empty string', () => {
      expect(qs.parse('')).toEqual({})
    })

    it('should decode URI components', () => {
      expect(qs.parse('name=%E5%BC%A0%E4%B8%89')).toEqual({ name: '张三' })
    })

    it('should handle values without equals sign', () => {
      expect(qs.parse('foo&bar=baz')).toEqual({ foo: '', bar: 'baz' })
    })

    it('should handle single parameter', () => {
      expect(qs.parse('foo=bar')).toEqual({ foo: 'bar' })
    })
  })

  describe('stringify', () => {
    it('should stringify basic object', () => {
      expect(qs.stringify({ foo: 'bar', baz: 'qux' })).toBe('foo=bar&baz=qux')
    })

    it('should add prefix when requested', () => {
      expect(qs.stringify({ foo: 'bar' }, true)).toBe('?foo=bar')
    })

    it('should encode URI components', () => {
      const result = qs.stringify({ name: '张三' })
      expect(result).toContain('%')
      expect(qs.parse(result)).toEqual({ name: '张三' })
    })

    it('should handle empty object', () => {
      expect(qs.stringify({})).toBe('')
    })

    it('should handle numbers', () => {
      expect(qs.stringify({ age: 25 })).toBe('age=25')
    })

    it('should filter out null and undefined', () => {
      expect(qs.stringify({ foo: 'bar', baz: null, qux: undefined })).toBe('foo=bar')
    })

    it('should handle special characters', () => {
      const obj = { url: 'https://example.com/path?query=1' }
      const stringified = qs.stringify(obj)
      expect(qs.parse(stringified)).toEqual(obj)
    })
  })

  describe('round trip', () => {
    it('should be reversible', () => {
      const original = { foo: 'bar', baz: 'qux', num: '123' }
      const stringified = qs.stringify(original)
      const parsed = qs.parse(stringified)
      expect(parsed).toEqual(original)
    })
  })
})
