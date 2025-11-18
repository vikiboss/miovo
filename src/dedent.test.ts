import { describe, expect, it } from 'vitest'
import { dedent } from './dedent'

describe('dedent', () => {
  it('should remove common leading whitespace from multi-line strings', () => {
    const result = dedent`
      Hello
      World
    `
    expect(result).toBe('Hello\nWorld')
  })

  it('should preserve relative indentation', () => {
    const result = dedent`
      function hello() {
        console.log('Hello')
      }
    `
    expect(result).toBe("function hello() {\n  console.log('Hello')\n}")
  })

  it('should handle strings with no indentation', () => {
    const result = dedent`No indentation here`
    expect(result).toBe('No indentation here')
  })

  it('should handle empty strings', () => {
    const result = dedent``
    expect(result).toBe('')
  })

  it('should handle strings with only whitespace', () => {
    const result = dedent`   `
    expect(result).toBe('')
  })

  it('should handle single line strings', () => {
    const result = dedent`Single line`
    expect(result).toBe('Single line')
  })

  it('should support string interpolation', () => {
    const name = 'Alice'
    const age = 25
    const result = dedent`
      Name: ${name}
      Age: ${age}
    `
    expect(result).toBe('Name: Alice\nAge: 25')
  })

  it('should handle mixed indentation levels', () => {
    const result = dedent`
      First level
        Second level
          Third level
        Back to second
      Back to first
    `
    expect(result).toBe('First level\n  Second level\n    Third level\n  Back to second\nBack to first')
  })

  it('should ignore empty lines when calculating minimum indent', () => {
    const result = dedent`
      Line 1

      Line 2
    `
    expect(result).toBe('Line 1\n\nLine 2')
  })

  it('should handle tabs as indentation', () => {
    const result = dedent`
		Tab indented
			Double tab
		Back to single
    `
    expect(result).toBe('Tab indented\n\tDouble tab\nBack to single')
  })

  it('should handle mixed spaces and tabs', () => {
    const result = dedent`
      Space indented
		Tab indented
      Space again
    `
    // Result depends on which has less indentation
    expect(result).toContain('Space indented')
    expect(result).toContain('Tab indented')
  })

  it('should trim leading and trailing empty lines', () => {
    const result = dedent`

      Content

    `
    expect(result).toBe('Content')
  })

  it('should handle code-like strings', () => {
    const result = dedent`
      if (true) {
        doSomething()
      }
    `
    expect(result).toBe('if (true) {\n  doSomething()\n}')
  })

  it('should handle HTML-like strings', () => {
    const result = dedent`
      <div>
        <p>Hello</p>
      </div>
    `
    expect(result).toBe('<div>\n  <p>Hello</p>\n</div>')
  })

  it('should handle JSON-like strings', () => {
    const result = dedent`
      {
        "name": "test",
        "value": 123
      }
    `
    expect(result).toBe('{\n  "name": "test",\n  "value": 123\n}')
  })

  it('should handle interpolation with objects', () => {
    const obj = { key: 'value' }
    const result = dedent`
      Object: ${obj}
      Done
    `
    expect(result).toContain('Object:')
    expect(result).toContain('Done')
  })

  it('should handle interpolation with arrays', () => {
    const arr = [1, 2, 3]
    const result = dedent`
      Array: ${arr}
      End
    `
    expect(result).toBe('Array: 1,2,3\nEnd')
  })

  it('should handle interpolation with numbers', () => {
    const num = 42
    const float = 3.14
    const result = dedent`
      Integer: ${num}
      Float: ${float}
    `
    expect(result).toBe('Integer: 42\nFloat: 3.14')
  })

  it('should handle interpolation with booleans', () => {
    const isTrue = true
    const isFalse = false
    const result = dedent`
      True: ${isTrue}
      False: ${isFalse}
    `
    expect(result).toBe('True: true\nFalse: false')
  })

  it('should handle interpolation with null and undefined', () => {
    const nullValue = null
    const undefinedValue = undefined
    const result = dedent`
      Null: ${nullValue}
      Undefined: ${undefinedValue}
    `
    expect(result).toBe('Null: null\nUndefined: undefined')
  })

  it('should handle deeply nested indentation', () => {
    const result = dedent`
      Level 0
        Level 1
          Level 2
            Level 3
              Level 4
                Level 5
    `
    expect(result).toBe('Level 0\n  Level 1\n    Level 2\n      Level 3\n        Level 4\n          Level 5')
  })

  it('should handle inconsistent starting indentation', () => {
    const result = dedent`
    Two spaces
      Four spaces
        Six spaces
    `
    expect(result).toBe('Two spaces\n  Four spaces\n    Six spaces')
  })

  it('should handle special characters and symbols', () => {
    const result = dedent`
      Special: !@#$%^&*()
      Brackets: []{}()<>
      Symbols: ~\`|\\/?
    `
    expect(result).toBe('Special: !@#$%^&*()\nBrackets: []{}()<>\nSymbols: ~`|\\/?')
  })

  it('should work with multiline template literal when first line has no indent', () => {
    const result = dedent`Line 1
      Line 2
        Line 3`
    // First line has no leading whitespace, so minIndent is 0
    // Nothing gets removed from any line
    expect(result).toBe('Line 1\n      Line 2\n        Line 3')
  })

  it('should handle lines with only indentation', () => {
    const result = dedent`
      Content

      More content
    `
    // Lines with only whitespace are treated as empty
    expect(result).toBe('Content\n\nMore content')
  })

  it('should handle complex real-world code example', () => {
    const result = dedent`
      class Example {
        constructor() {
          this.value = 42
        }

        method() {
          if (this.value > 0) {
            return true
          }
          return false
        }
      }
    `
    expect(result).toContain('class Example')
    expect(result).toContain('  constructor()')
    expect(result).toContain('    this.value = 42')
  })

  it('should handle SQL-like queries', () => {
    const table = 'users'
    const result = dedent`
      SELECT *
      FROM ${table}
      WHERE id = 1
        AND active = true
      ORDER BY created_at DESC
    `
    expect(result).toBe('SELECT *\nFROM users\nWHERE id = 1\n  AND active = true\nORDER BY created_at DESC')
  })
})
