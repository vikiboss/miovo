import { describe, expect, it } from 'vitest'
import { timestamp } from './timestamp'

describe('timestamp', () => {
  it('should return a number', () => {
    expect(typeof timestamp()).toBe('number')
  })

  it('should return milliseconds by default', () => {
    const ts = timestamp()
    const now = Date.now()

    expect(ts).toBeGreaterThan(1700000000000)
    expect(Math.abs(ts - now)).toBeLessThan(10)
  })

  it('should return seconds when requested', () => {
    const ts = timestamp(true)
    const now = Math.floor(Date.now() / 1000)

    expect(ts).toBeGreaterThan(1700000000)
    expect(Math.abs(ts - now)).toBeLessThanOrEqual(1)
  })

  it('should return different values on consecutive calls', () => {
    const ts1 = timestamp()
    const ts2 = timestamp()

    expect(ts2).toBeGreaterThanOrEqual(ts1)
  })

  it('should be close to Date.now()', () => {
    const ts = timestamp()
    const dateNow = Date.now()

    expect(Math.abs(ts - dateNow)).toBeLessThan(5)
  })

  it('should convert correctly between seconds and milliseconds', () => {
    const ms = timestamp()
    const sec = timestamp(true)

    expect(Math.abs(ms / 1000 - sec)).toBeLessThan(1)
  })
})
