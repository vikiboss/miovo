/**
 * Generates a RFC4122 version 4 compliant UUID (Universally Unique Identifier).
 *
 * **Key Features:**
 * - Generates standard UUID v4 format (xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx)
 * - Uses crypto.randomUUID() when available for better randomness
 * - Falls back to Math.random() in environments without crypto support
 * - Statistically unique across time and space
 * - 36 characters including hyphens
 *
 * **Use Cases:**
 * - Generating unique identifiers for entities
 * - Creating unique keys for React components
 * - Database record IDs
 * - Temporary file names
 * - Session IDs
 *
 * @returns A UUID v4 string in the format xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
 *
 * @example
 * Basic usage:
 * ```ts
 * const id = uuid()
 * // Returns: "550e8400-e29b-41d4-a716-446655440000" (example)
 * ```
 *
 * @example
 * As a React key:
 * ```tsx
 * const items = data.map(item => (
 *   <Item key={uuid()} data={item} />
 * ))
 * ```
 *
 * @example
 * Multiple unique IDs:
 * ```ts
 * const id1 = uuid()
 * const id2 = uuid()
 * console.log(id1 !== id2) // true
 * ```
 *
 * @example
 * Database entity ID:
 * ```ts
 * const user = {
 *   id: uuid(),
 *   name: 'John Doe',
 *   email: 'john@example.com'
 * }
 * ```
 */
export function uuid(): string {
  // Use crypto.randomUUID if available (modern browsers and Node.js 16+)
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }

  // Fallback implementation for older environments
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
