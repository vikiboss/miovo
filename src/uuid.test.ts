import { describe, expect, it } from 'vitest'
import { uuid } from './uuid'

describe('uuid', () => {
  it('should return a string', () => {
    const result = uuid()
    expect(typeof result).toBe('string')
  })

  it('should return a string of length 36', () => {
    const result = uuid()
    expect(result.length).toBe(36)
  })

  it('should match UUID v4 format', () => {
    const result = uuid()
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

    expect(result).toMatch(uuidRegex)
  })

  it('should have hyphens in correct positions', () => {
    const result = uuid()

    expect(result[8]).toBe('-')
    expect(result[13]).toBe('-')
    expect(result[18]).toBe('-')
    expect(result[23]).toBe('-')
  })

  it('should have version 4 indicator', () => {
    const result = uuid()
    // The 15th character (index 14) should be '4' for version 4
    expect(result[14]).toBe('4')
  })

  it('should have correct variant bits', () => {
    const result = uuid()
    // The 20th character (index 19) should be 8, 9, a, or b
    const variantChar = result[19]
    expect(['8', '9', 'a', 'b', 'A', 'B']).toContain(variantChar)
  })

  it('should generate unique IDs', () => {
    const ids = new Set<string>()
    const count = 1000

    for (let i = 0; i < count; i++) {
      ids.add(uuid())
    }

    expect(ids.size).toBe(count)
  })

  it('should generate different IDs on consecutive calls', () => {
    const id1 = uuid()
    const id2 = uuid()
    const id3 = uuid()

    expect(id1).not.toBe(id2)
    expect(id2).not.toBe(id3)
    expect(id1).not.toBe(id3)
  })

  it('should only contain valid hex characters and hyphens', () => {
    const result = uuid()
    const validChars = /^[0-9a-f-]+$/i

    expect(result).toMatch(validChars)
  })

  it('should have correct structure segments', () => {
    const result = uuid()
    const segments = result.split('-')

    expect(segments.length).toBe(5)
    expect(segments[0].length).toBe(8)
    expect(segments[1].length).toBe(4)
    expect(segments[2].length).toBe(4)
    expect(segments[3].length).toBe(4)
    expect(segments[4].length).toBe(12)
  })

  it('should be lowercase', () => {
    const result = uuid()
    expect(result).toBe(result.toLowerCase())
  })

  it('should handle rapid generation', () => {
    const ids: string[] = []

    for (let i = 0; i < 100; i++) {
      ids.push(uuid())
    }

    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(100)
  })

  it('should maintain format consistency', () => {
    const pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

    for (let i = 0; i < 50; i++) {
      const result = uuid()
      expect(result).toMatch(pattern)
    }
  })

  it('should handle burst generation without collisions', () => {
    const ids: string[] = []

    // Generate many IDs in quick succession
    for (let i = 0; i < 500; i++) {
      ids.push(uuid())
    }

    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(500)
  })

  it('should have proper bit distribution in version field', () => {
    // Test multiple UUIDs to ensure version field is always '4'
    for (let i = 0; i < 20; i++) {
      const id = uuid()
      expect(id[14]).toBe('4')
    }
  })

  it('should have proper bit distribution in variant field', () => {
    // Test multiple UUIDs to ensure variant field follows RFC4122
    for (let i = 0; i < 20; i++) {
      const id = uuid()
      const variantChar = id[19].toLowerCase()
      expect(['8', '9', 'a', 'b']).toContain(variantChar)
    }
  })
})
