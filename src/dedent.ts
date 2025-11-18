/**
 * A template literal tag function that removes leading indentation from multi-line strings.
 *
 * This function is particularly useful for formatting template literals that contain
 * indented code or text blocks while preserving relative indentation within the content.
 *
 * **Key Features:**
 * - Automatically detects and removes common leading whitespace
 * - Preserves relative indentation within the content
 * - Trims empty leading and trailing lines
 * - Handles both spaces and tabs
 * - Supports string interpolation within template literals
 *
 * @template T - Type of interpolated values (automatically inferred)
 *
 * @param strings - The template strings array from the tagged template literal
 * @param values - Interpolated values within the template literal
 *
 * @returns The dedented string with common leading whitespace removed and trimmed
 *
 * @example
 * Basic usage with template literal:
 * ```ts
 * const code = dedent`
 *   function hello() {
 *     console.log('Hello, World!')
 *   }
 * `
 * // Returns: "function hello() {\n  console.log('Hello, World!')\n}"
 * ```
 *
 * @example
 * With interpolated values:
 * ```ts
 * const name = 'Alice'
 * const greeting = dedent`
 *   Hello, ${name}!
 *   Welcome to our app.
 * `
 * // Returns: "Hello, Alice!\nWelcome to our app."
 * ```
 *
 * @example
 * Preserving relative indentation:
 * ```ts
 * const nested = dedent`
 *   if (true) {
 *     if (true) {
 *       console.log('nested')
 *     }
 *   }
 * `
 * // Relative indentation is preserved
 * ```
 */
export function dedent<T extends readonly unknown[]>(strings: TemplateStringsArray, ...values: T): string {
  // Combine template strings and interpolated values
  const fullString = strings.reduce((acc, str, i) => acc + values[i - 1] + str)

  // Split into lines for processing
  const lines = fullString.split('\n')

  // Find the minimum indentation level (excluding empty lines)
  const minIndent = lines.reduce((min, line) => {
    // Skip empty or whitespace-only lines when calculating minimum indent
    if (line.trim() === '') return min

    // Match leading whitespace
    const match = line.match(/^(\s*)/)
    const indent = match ? match[1].length : 0

    return Math.min(min, indent)
  }, Infinity)

  // Remove the common indentation from each line
  const dedentedLines = lines.map((line) => (line.length > 0 ? line.slice(minIndent) : line))

  // Join lines and trim leading/trailing whitespace
  return dedentedLines.join('\n').trim()
}
