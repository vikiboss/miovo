# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Miovo** is a type-safe, dependency-free, modern utility library for JavaScript and TypeScript. It provides 20+ carefully crafted utility functions and 21 TypeScript utility types.

### Core Philosophy

1. **TypeScript First** - All code written in TypeScript with full type safety
2. **Zero Dependencies** - No external runtime dependencies
3. **Universal Runtime** - Works in Node.js, Browsers, Deno, Bun, and Cloudflare Workers
4. **Modern & Minimal** - Uses latest ECMAScript features (ES2025+)
5. **Tree-shakable** - ESM-first with optimal tree-shaking support
6. **Well-tested** - 281+ tests with 100% coverage goal

## Project Structure

```
miovo/
├── src/                    # Source code
│   ├── *.ts               # Implementation files
│   ├── *.test.ts          # Test files (co-located)
│   ├── index.ts           # Main entry point
│   └── types.ts           # TypeScript utility types
├── dist/                  # Build output (generated)
│   ├── index.mjs          # ESM bundle
│   ├── index.cjs          # CommonJS bundle
│   ├── index.d.mts        # ESM type declarations
│   └── index.d.cts        # CJS type declarations
├── package.json           # Package manifest
├── tsconfig.json          # TypeScript configuration
├── tsdown.config.ts       # Build configuration
├── readme.md              # Project documentation
├── license                # MIT license
└── .gitignore             # Git ignore rules
```

## Naming Conventions

**IMPORTANT**: All files use **kebab-case** naming:

✅ **Correct:**

- `format-ms.ts`
- `random-id.ts`
- `to-array.ts`
- `readme.md`
- `license`

❌ **Incorrect:**

- `formatMs.ts` (camelCase)
- `RandomId.ts` (PascalCase)
- `README.md` (uppercase)
- `LICENSE` (uppercase)

**Exception**: Standard config files follow their ecosystem conventions:

- `package.json` (npm standard)
- `tsconfig.json` (TypeScript standard)

## Code Style Guidelines

### File Organization

Each utility function follows this structure:

````typescript
/**
 * Brief description of the function.
 *
 * **Key Features:**
 * - Feature 1
 * - Feature 2
 *
 * @param param1 - Description
 * @returns Description
 *
 * @example
 * Basic usage:
 * ```ts
 * // Example code
 * ```
 */
export function utilityName(param: Type): ReturnType {
  // Implementation
}
````

### TypeScript Patterns

1. **Prefer explicit types** over `any`
2. **Use const assertions** for literal types
3. **Export types alongside functions**
4. **Document all public APIs** with JSDoc

### Testing Strategy

- **Co-located tests**: `function.ts` → `function.test.ts`
- **Comprehensive coverage**: Test happy paths, edge cases, and errors
- **Clear test names**: Use descriptive `it()` statements
- **Vitest framework**: Uses `describe`, `it`, `expect`

Example test structure:

```typescript
import { describe, expect, it } from 'vitest'
import { myFunction } from './my-function'

describe('myFunction', () => {
  it('should handle basic case', () => {
    expect(myFunction('input')).toBe('expected')
  })

  it('should handle edge case', () => {
    expect(myFunction('')).toBe('')
  })

  it('should handle null/undefined', () => {
    expect(myFunction(null)).toBe(null)
  })
})
```

## TypeScript Configuration

The project uses strict TypeScript settings for maximum type safety:

### Key Compiler Options

- **`strict: true`** - All strict checks enabled
- **`noUncheckedIndexedAccess: false`** - Disabled to avoid false positives in production code
- **`verbatimModuleSyntax: true`** - Explicit type-only imports
- **`moduleResolution: "Bundler"`** - Modern bundler-aware resolution
- **`target: "ESNext"`** - Latest JavaScript features
- **`noUnusedLocals/Parameters: true`** - Catch unused code

### Why These Settings?

1. **Strict mode** catches bugs early
2. **Bundler resolution** works with modern tools (Vite, Rollup, tsdown)
3. **ESNext target** allows using latest JS features (bundler handles transpilation)
4. **No emit** because tsdown handles compilation

## Build System

### Tools

- **tsdown** - Fast TypeScript bundler (powered by Rolldown)
- **Vitest** - Modern test runner
- **TypeScript 5.9+** - Type checking

### Build Commands

```bash
# Development (watch mode)
pnpm dev

# Production build (generates dist/)
pnpm build

# Type checking only
pnpm typecheck

# Run tests
pnpm test

# Run tests once (CI mode)
pnpm test run

# Run tests with coverage
pnpm test:coverage
```

### Build Output

tsdown generates 4 files:

1. **`index.mjs`** - ESM bundle for modern environments
2. **`index.cjs`** - CommonJS bundle for legacy Node.js
3. **`index.d.mts`** - ESM type declarations
4. **`index.d.cts`** - CJS type declarations

## Adding New Utilities

### Step 1: Create Files

```bash
# Create implementation file
touch src/my-utility.ts

# Create test file
touch src/my-utility.test.ts
```

### Step 2: Implement Function

````typescript
// src/my-utility.ts

/**
 * Description of what the function does.
 *
 * **Key Features:**
 * - Feature 1
 * - Feature 2
 *
 * @param input - Input description
 * @returns Return description
 *
 * @example
 * ```ts
 * myUtility('input')  // Returns: 'output'
 * ```
 */
export function myUtility(input: string): string {
  // Implementation
  return input.toUpperCase()
}
````

### Step 3: Write Tests

```typescript
// src/my-utility.test.ts

import { describe, expect, it } from 'vitest'
import { myUtility } from './my-utility'

describe('myUtility', () => {
  it('should transform input correctly', () => {
    expect(myUtility('hello')).toBe('HELLO')
  })

  it('should handle empty string', () => {
    expect(myUtility('')).toBe('')
  })
})
```

### Step 4: Export from Index

```typescript
// src/index.ts

export { myUtility } from './my-utility'
```

### Step 5: Update Documentation

Add entry to `readme.md` in the appropriate section.

### Step 6: Verify

```bash
pnpm build
pnpm test
pnpm typecheck
```

## TypeScript Utility Types

### Current Types (21 total)

Organized by category:

**Object Transformations:**

- `DeepPartial<T>` - Make all properties optional recursively
- `DeepRequired<T>` - Make all properties required recursively
- `DeepReadonly<T>` - Make all properties readonly recursively
- `Mutable<T>` - Remove readonly modifiers

**Type Manipulation:**

- `Prettify<T>` - Flatten intersection types
- `UnionToIntersection<U>` - Convert union to intersection
- `PickByValue<T, V>` - Pick properties by value type
- `OmitByValue<T, V>` - Omit properties by value type

**Selective Modifiers:**

- `RequireKeys<T, K>` - Make specific keys required
- `PartialKeys<T, K>` - Make specific keys optional
- `Nullable<T, K>` - Make keys nullable

**Function Utilities:**

- `FunctionKeys<T>` - Extract function property keys
- `OmitFunctions<T>` - Omit all function properties

**Advanced Constraints:**

- `RequireAtLeastOne<T, Keys>` - Require at least one of specified keys
- `RequireOnlyOne<T, Keys>` - Require exactly one of specified keys

**Type Detection:**

- `IsAny<T>` - Check if type is `any`
- `IsNever<T>` - Check if type is `never`
- `IsUnknown<T>` - Check if type is `unknown`

**Template Literals:**

- `StringToNumber<S>` - Convert string literal to number

### Adding New Type Utilities

1. Add to `src/types.ts` with full JSDoc
2. Add tests to `src/types.test.ts` using `expectTypeOf`
3. Export from `src/index.ts`
4. Document in `readme.md`

**Check if native TypeScript alternative exists first!**

Examples of types we DON'T need:

- ~~`ArrayElement<T>`~~ → Use `T[number]` directly
- ~~`PromiseType<T>`~~ → Use built-in `Awaited<T>`
- ~~`Except<T, K>`~~ → Use built-in `Omit<T, K>`

## Common Tasks

### Fix Type Errors

```bash
# Check types
pnpm typecheck

# Common fixes:
# 1. Add null checks for potentially undefined values
# 2. Use type assertions when you know better than TS
# 3. Add proper return types to functions
```

### Update Dependencies

```bash
# Check outdated packages
pnpm outdated

# Update all dependencies
pnpm update

# Update specific package
pnpm update <package-name>
```

### Prepare for Release

```bash
# Run full test suite
pnpm build && pnpm test run && pnpm typecheck

# Update version in package.json
# Update changelog if exists
# Commit changes
# Tag release
# npm publish (or pnpm publish)
```

## Performance Considerations

1. **Avoid `Array.from()`** when spread syntax works: `[...set]` vs `Array.from(set)`
2. **Use `for...of`** instead of `.forEach()` for better performance
3. **Minimize object allocations** in hot paths
4. **Use early returns** to avoid unnecessary computations

## Best Practices

### DO ✅

- Use TypeScript strict mode
- Write comprehensive tests
- Document all public APIs
- Keep functions small and focused
- Use descriptive variable names
- Export types alongside implementations
- Follow kebab-case naming
- Use modern JavaScript features

### DON'T ❌

- Use `any` type (use `unknown` or proper types)
- Ignore TypeScript errors
- Skip writing tests
- Create files without tests
- Use outdated JavaScript patterns
- Add runtime dependencies
- Use uppercase for file names (except package.json, tsconfig.json)
- Over-engineer simple utilities

## Troubleshooting

### Build Fails

```bash
# Clean and rebuild
rm -rf dist node_modules
pnpm install
pnpm build
```

### Tests Fail

```bash
# Run specific test file
pnpm test src/my-utility.test.ts

# Run tests in watch mode
pnpm test
```

### Type Errors

```bash
# Clear TypeScript cache
rm -rf node_modules/.cache

# Check configuration
cat tsconfig.json
```

## Publishing Checklist

Before publishing to npm:

- [ ] All tests pass (`pnpm test run`)
- [ ] Types check (`pnpm typecheck`)
- [ ] Build succeeds (`pnpm build`)
- [ ] Version bumped in `package.json`
- [ ] Documentation updated in `readme.md`
- [ ] Changelog updated (if exists)
- [ ] Git committed and tagged

## Resources

- **TypeScript Handbook**: https://www.typescriptlang.org/docs/
- **Vitest Documentation**: https://vitest.dev/
- **tsdown**: https://github.com/egoist/tsdown
- **ECMAScript 2025**: https://tc39.es/ecma262/

## Project Philosophy

> "The best code is no code at all."

Every function in this library exists because:

1. It solves a real, common problem
2. It's simpler than alternatives (lodash, etc.)
3. It's well-tested and reliable
4. It works everywhere (universal runtime support)
5. It has zero dependencies

When adding new utilities, ask:

- "Is this really needed?"
- "Can users do this in 1-2 lines of native code?"
- "Does this work in all JavaScript environments?"

If the answer to any question is unclear, discuss before implementing.
