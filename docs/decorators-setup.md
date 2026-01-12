# Decorator Setup & Configuration

As of early 2026, Bun has full support for "Legacy" TypeScript decorators (used by frameworks like NestJS), but its support for the newer **TC39 (Stage 3) Standard Decorators** is currently limited and inconsistent.

This project relies on **Standard Decorators** (similar to `@kanian77/choux`). To ensure stability and compatibility across both development (Node/Bun) and production (Bun), we utilize a transpilation strategy rather than relying on native runtime support.

## The Strategy

The core idea is to let **TypeScript** handle the complexity of decorators by compiling them "away" into standard JavaScript function calls before the code is executed by the runtime.

### 1. `tsconfig.json` Configuration

We deliberately configure TypeScript to use the standard behavior but emit older, compatible JavaScript.

```json
{
  "compilerOptions": {
    // 1. Disable legacy experimental decorators to opt-in to TC39 Standard Decorators
    "experimentalDecorators": false,
    "emitDecoratorMetadata": false,

    // 2. Force field definitions to follow the standard class fields semantics
    "useDefineForClassFields": true,

    // 3. Lower the target to ES2017 (or anything below ESNext)
    // This is the CRITICAL step. It forces tsc to down-level transpile the decorators
    // into helper functions effectively "baking" them into the JS.
    "target": "es2017"
  }
}
```

By setting `"target": "es2017"`, TypeScript transforms the confusing (for Bun) standard decorators into plain JavaScript that performs the same logic. This bypassed the need for the runtime (Bun) to understand the `decorator` syntax natively.

### 2. Runtime & Scripts

We use different approaches for development and production to maintain speed while ensuring correctness.

#### Development (`dev`)

```bash
bun run dev # "ENV=dev tsx watch src/index.ts"
```

We use `tsx` (powered by `esbuild`) for development. `tsx` handles the TypeScript execution and supports the standard decorator syntax transformation on-the-fly, allowing for a fast feedback loop.

#### Production (`start`)

```bash
bun start # "ENV=prod bun run dist/index.js"
```

For production, we do **not** run the source files directly with Bun.

1.  **`prestart`**: First, `bun run build` invokes `tsc`.
2.  `tsc` reads our config and transpiles `src/` -> `dist/`, converting all standard decorators into ES2017-compatible JavaScript code.
3.  **`start`**: `bun run dist/index.js` executes the _compiled_ artifact. Since the decorators are already gone (transpiled), Bun executes the code as standard JavaScript without issues.

## Summary Table

| Feature                      | Configuration           | Reason                                                      |
| :--------------------------- | :---------------------- | :---------------------------------------------------------- |
| **Decorator Behavior**       | TC39 Stage 3 (Standard) | Standardized future of JS, used by `@kanian77/tject`.       |
| **`experimentalDecorators`** | `false`                 | Disables the old legacy behavior (NestJS style).            |
| **`target`**                 | `es2017`                | Forces `tsc` to transpile decorators into standard JS code. |
| **Production Runtime**       | `dist/index.js`         | Runs stable, transpiled code instead of raw source.         |

This setup mimics the reliability of older environments while allowing us to use modern language features today.
