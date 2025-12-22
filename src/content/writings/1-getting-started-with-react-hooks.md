---
title: "Getting Started with React Hooks"
description: "A comprehensive guide to understanding and using React Hooks in your applications."
date: "2024-01-15"
category: "Tutorial"
tags: ["react", "javascript", "hooks"]
---

# Getting Started with React Hooks

React Hooks revolutionized the way we write React components. Let's explore the fundamentals and best practices.

## What are Hooks?

Hooks are functions that let you "hook into" React state and lifecycle features from function components. They were introduced in React 16.8 to solve several problems:

- **Reusing stateful logic** between components
- **Complex components** becoming hard to understand
- **Classes** being confusing for both people and machines

## The useState Hook

The most basic hook is `useState`, which lets you add state to function components:

```javascript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

The `useState` hook returns a pair: the current state value and a function to update it.

## The useEffect Hook

For side effects in your components, use `useEffect`:

```javascript
import { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Update document title
    document.title = `You clicked ${count} times`;

    // Optional: return cleanup function
    return () => {
      console.log('Cleanup');
    };
  }, [count]); // Only re-run if count changes

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

### Dependency Array

The second argument to `useEffect` is crucial:

| Dependency Array | Behavior |
|-----------------|----------|
| Not provided | Runs after every render |
| Empty array `[]` | Runs once after initial render |
| `[dep1, dep2]` | Runs when dependencies change |

## Custom Hooks

You can create your own hooks to extract component logic:

```javascript
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return width;
}

// Usage
function MyComponent() {
  const width = useWindowWidth();
  return <div>Window width: {width}px</div>;
}
```

## Rules of Hooks

> **Important:** Always follow these two rules when using hooks

1. **Only call hooks at the top level** - Don't call hooks inside loops, conditions, or nested functions
2. **Only call hooks from React functions** - Call them from function components or custom hooks

## Common Hooks

Here's a quick reference of built-in React hooks:

- **useState** - Add state to function components
- **useEffect** - Perform side effects
- **useContext** - Subscribe to React context
- **useReducer** - Complex state logic alternative to useState
- **useCallback** - Memoize callbacks
- **useMemo** - Memoize expensive computations
- **useRef** - Create mutable references
- **useLayoutEffect** - Like useEffect but fires synchronously

## Best Practices

### 1. Keep effects focused

Each `useEffect` should handle one concern:

```javascript
// Bad - multiple concerns
useEffect(() => {
  fetchUser();
  subscribeToNotifications();
  updateAnalytics();
}, []);

// Good - separate effects
useEffect(() => {
  fetchUser();
}, []);

useEffect(() => {
  subscribeToNotifications();
  return () => unsubscribe();
}, []);

useEffect(() => {
  updateAnalytics();
}, []);
```

### 2. Extract custom hooks

When logic becomes complex, extract it into a custom hook:

```javascript
function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { user, loading };
}
```

### 3. Avoid unnecessary dependencies

Only include variables that are actually used:

```javascript
// Unnecessary dependency
useEffect(() => {
  console.log('Count changed');
}, [count, name]); // 'name' is not used

// Better
useEffect(() => {
  console.log('Count changed');
}, [count]);
```

## Conclusion

React Hooks provide a powerful way to write cleaner, more maintainable components. By following the rules and best practices, you can leverage hooks to build better React applications.

Start with `useState` and `useEffect`, then gradually explore other hooks as needed. Remember: hooks are just JavaScript functions that follow certain conventions!
