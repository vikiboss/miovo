import { describe, expect, it } from 'vitest'
import { noop } from './noop'

describe('noop', () => {
  it('should be a function', () => {
    expect(typeof noop).toBe('function')
  })

  it('should return undefined', () => {
    expect(noop()).toBeUndefined()
  })

  it('should accept any arguments without error', () => {
    expect(() => noop()).not.toThrow()
    expect(() => (noop as any)(1, 2, 3)).not.toThrow()
    expect(() => (noop as any)('test', { key: 'value' })).not.toThrow()
  })

  it('should always return undefined regardless of arguments', () => {
    expect((noop as any)(1, 2, 3)).toBeUndefined()
    expect((noop as any)('test')).toBeUndefined()
  })

  it('should be usable as default callback', () => {
    const execute = (callback = noop) => callback()
    expect(() => execute()).not.toThrow()
    expect(execute()).toBeUndefined()
  })
})
