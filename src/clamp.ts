/**
 * Clamps a number within the inclusive range defined by min and max.
 *
 * **Key Features:**
 * - Ensures value stays within bounds
 * - Works with negative numbers
 * - Type-safe with TypeScript
 *
 * @param value - The number to clamp
 * @param min - The minimum value
 * @param max - The maximum value
 *
 * @returns The clamped value
 *
 * @example
 * Basic usage:
 * ```ts
 * clamp(15, 0, 10)   // Returns: 10
 * clamp(-5, 0, 10)   // Returns: 0
 * clamp(5, 0, 10)    // Returns: 5
 * ```
 *
 * @example
 * With negative numbers:
 * ```ts
 * clamp(-15, -10, -5)  // Returns: -10
 * clamp(-3, -10, -5)   // Returns: -5
 * ```
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
