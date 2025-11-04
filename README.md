A small todo example using @kanian77/tsject

## To install dependencies:
```sh
bun install
```

To run:
```sh
bun run dev
```

open http://localhost:3000

## Runtimes and decorator support

The new TypeScript decorator standard (Stage 3) is supported differently by runtimes. Choose the workflow that matches your runtime.

1. Deno — Native Stage 3 support

- Deno executes TypeScript natively and supports Stage 3 decorators.
- How to run:

```bash
deno run --allow-read your-file.ts
```

- tsconfig: Deno is zero-config; omit the old experimental decorator flag (do not set "experimentalDecorators": true).

2. Node.js — Transpile first

- Node's V8 does not yet support Stage 3 decorator syntax. Transpile first with `tsc`, then run the compiled JavaScript.
- How to run:

```bash
# 1) compile
npm run build

# 2) run compiled JS
node dist/your-file.js
```

- tsconfig: Use Stage 3 settings — omit or set `"experimentalDecorators": false` so `tsc` emits Stage 3-compatible transpiled JS.

3. Bun — Two modes (legacy native vs transpiled JS)

- Bun's native TypeScript transpiler supports legacy decorators only (the older emit).
- To use Stage 3 decorators (this project): transpile with `tsc` and run the compiled JS with Bun or Node.

```bash
npm run build
bun run dist/your-file.js
```

- Summary:
  - Bun native (`bun run file.ts`): legacy decorators only (requires `"experimentalDecorators": true` in tsconfig).
  - Bun running compiled JS: works with Stage 3 (transpile with `tsc` which uses `"experimentalDecorators": false`).

Recommended tsconfig for Stage 3 (this repository)

- See `tsconfig.json`. Important bits:
  - `"experimentalDecorators": false` (or omit) to use the new Stage 3 decorators.
  - Compile to a target like `ES2015` so `tsc` emits plain JS that Node/Bun can run.
