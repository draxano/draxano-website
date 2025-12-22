---
title: "TypeScript Best Practices"
description: "Essential patterns and best practices for writing maintainable TypeScript code."
date: "2024-03-10"
category: "Programming"
tags: ["typescript", "javascript", "best-practices"]
---

# TypeScript Best Practices

TypeScript brings type safety to JavaScript. Here are essential patterns and best practices for writing clean, maintainable TypeScript code.

## Type Inference

Let TypeScript infer types when possible:

```typescript
// Don't - redundant type annotation
const count: number = 5;

// Do - TypeScript infers the type
const count = 5;

// Do - annotate when inference isn't enough
const items: string[] = [];
```

## Interface vs Type

Both work for object types, but they have subtle differences:

```typescript
// Interface - can be extended and merged
interface User {
  id: number;
  name: string;
}

interface User {
  email: string; // Declaration merging
}

// Type - more flexible, better for unions
type ID = string | number;
type Point = { x: number; y: number };
type Shape = Circle | Rectangle | Triangle;
```

> **Rule of thumb:** Use interface for object shapes that might be extended, use type for everything else.

## Utility Types

TypeScript provides powerful utility types:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
}

// Pick - select specific properties
type UserPreview = Pick<User, 'id' | 'name'>;

// Omit - exclude properties
type UserWithoutEmail = Omit<User, 'email'>;

// Partial - make all properties optional
type PartialUser = Partial<User>;

// Required - make all properties required
type RequiredUser = Required<User>;

// Readonly - make all properties readonly
type ReadonlyUser = Readonly<User>;
```

## Discriminated Unions

Create type-safe variants:

```typescript
type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };

function handleResult<T>(result: Result<T>) {
  if (result.success) {
    // TypeScript knows result.data exists
    console.log(result.data);
  } else {
    // TypeScript knows result.error exists
    console.error(result.error);
  }
}

// Usage
const userResult: Result<User> = await fetchUser();
handleResult(userResult);
```

## Generic Constraints

Constrain generic types for better type safety:

```typescript
// Without constraint - too permissive
function getProperty<T>(obj: T, key: string) {
  return obj[key]; // Error: Element implicitly has 'any' type
}

// With constraint - type-safe
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]; // Type is T[K]
}

const user = { id: 1, name: 'John' };
const name = getProperty(user, 'name'); // Type is string
const invalid = getProperty(user, 'invalid'); // Error!
```

## Type Guards

Create custom type guards for runtime checks:

```typescript
interface Cat {
  type: 'cat';
  meow: () => void;
}

interface Dog {
  type: 'dog';
  bark: () => void;
}

type Animal = Cat | Dog;

// Type guard using 'is' keyword
function isCat(animal: Animal): animal is Cat {
  return animal.type === 'cat';
}

function makeSound(animal: Animal) {
  if (isCat(animal)) {
    animal.meow(); // TypeScript knows this is a Cat
  } else {
    animal.bark(); // TypeScript knows this is a Dog
  }
}
```

## Const Assertions

Preserve literal types:

```typescript
// Without const assertion
const colors = ['red', 'green', 'blue']; // Type: string[]

// With const assertion
const colors = ['red', 'green', 'blue'] as const;
// Type: readonly ["red", "green", "blue"]

type Color = typeof colors[number]; // "red" | "green" | "blue"

// Object const assertion
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000
} as const;

// config.apiUrl = 'new-url'; // Error: readonly property
```

## Mapped Types

Transform types programmatically:

```typescript
type Optional<T> = {
  [K in keyof T]?: T[K];
};

type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object
    ? DeepReadonly<T[K]>
    : T[K];
};

interface User {
  id: number;
  profile: {
    name: string;
    age: number;
  };
}

type ReadonlyUser = DeepReadonly<User>;
// All nested properties are readonly
```

## Template Literal Types

Create string literal types:

```typescript
type Color = 'red' | 'blue' | 'green';
type Shade = 'light' | 'dark';

type ColorShade = `${Shade}-${Color}`;
// "light-red" | "light-blue" | "light-green" |
// "dark-red" | "dark-blue" | "dark-green"

type EventName = `on${Capitalize<'click' | 'hover' | 'focus'>}`;
// "onClick" | "onHover" | "onFocus"
```

## Best Practices Summary

### Do's ✅

1. **Enable strict mode** in tsconfig.json
2. **Prefer unknown over any** for truly unknown types
3. **Use readonly for immutable data**
4. **Leverage type inference**
5. **Create discriminated unions** for variants
6. **Use const assertions** for literal types

### Don'ts ❌

1. **Don't use `any`** unless absolutely necessary
2. **Don't ignore errors** with `@ts-ignore`
3. **Don't over-annotate** obvious types
4. **Don't use type assertions** unless required
5. **Don't create overly complex types** that hurt readability

## Configuration

Essential tsconfig.json settings:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

## Conclusion

TypeScript's type system is powerful and flexible. By following these best practices, you can write code that's:

- **Type-safe** - Catch errors at compile time
- **Maintainable** - Self-documenting and easy to refactor
- **Scalable** - Works well in large codebases

Remember: TypeScript is a tool to help you write better JavaScript. Use it to make your code more robust, but don't fight the type system unnecessarily.
