import { describe, expect, it } from 'vitest'
import { base64 } from './base64'

describe('base64', () => {
  describe('encode', () => {
    it('should encode basic string', () => {
      expect(base64.encode('Hello, World!')).toBe('SGVsbG8sIFdvcmxkIQ==')
    })

    it('should encode empty string', () => {
      expect(base64.encode('')).toBe('')
    })

    it('should encode numbers', () => {
      expect(base64.encode('12345')).toBe('MTIzNDU=')
    })

    it('should encode special characters', () => {
      const encoded = base64.encode('!@#$%^&*()')
      expect(encoded).toBeTruthy()
      expect(base64.decode(encoded)).toBe('!@#$%^&*()')
    })

    it('should encode unicode characters', () => {
      const encoded = base64.encode('你好')
      expect(encoded).toBeTruthy()
      expect(base64.decode(encoded)).toBe('你好')
    })

    it('should encode emojis', () => {
      const encoded = base64.encode('😀🎉')
      expect(encoded).toBeTruthy()
      expect(base64.decode(encoded)).toBe('😀🎉')
    })

    it('should be reversible', () => {
      const original = 'Test String 123'
      const encoded = base64.encode(original)
      const decoded = base64.decode(encoded)
      expect(decoded).toBe(original)
    })
  })

  describe('decode', () => {
    it('should decode basic string', () => {
      expect(base64.decode('SGVsbG8sIFdvcmxkIQ==')).toBe('Hello, World!')
    })

    it('should decode empty string', () => {
      expect(base64.decode('')).toBe('')
    })

    it('should decode numbers', () => {
      expect(base64.decode('MTIzNDU=')).toBe('12345')
    })

    it('should be reversible with encode', () => {
      const tests = ['Simple text', '123456', 'Special !@#$%', '你好世界', '😀🎉🚀', 'Mixed 混合 text']

      for (const test of tests) {
        const encoded = base64.encode(test)
        const decoded = base64.decode(encoded)
        expect(decoded).toBe(test)
      }
    })
  })

  describe('round trip', () => {
    it('should handle multiple encode/decode cycles', () => {
      let str = 'Original'

      for (let i = 0; i < 3; i++) {
        str = base64.encode(str)
      }

      for (let i = 0; i < 3; i++) {
        str = base64.decode(str)
      }

      expect(str).toBe('Original')
    })

    it('should handle long strings', () => {
      const long = 'a'.repeat(10000)
      const encoded = base64.encode(long)
      const decoded = base64.decode(encoded)
      expect(decoded).toBe(long)
    })
  })
})
