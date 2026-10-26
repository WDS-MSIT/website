# Code style

Project-specific coding conventions that tools do not already enforce. If the formatter, linter, compiler, or test suite already expresses a rule, that tool wins and the rule does not belong here.

## Languages and versions

- TypeScript is the primary language.
- Use a Node.js version accepted by the `engines` field in `package.json`; the initial baseline is Node.js `^22.23.4 || >=24.22.1`.
- Use pnpm for dependency and script commands.

## Formatting and naming

- Use simple, intuitive names that read easily.
  - Prefer plain verbs like `find` or `search` over longer ones like `retrieve`, `locate`, or `resolve`. For example, `findUser` over `retrieveUserAccountRecord`.
  - Pick the name a teammate would guess, not the most accurate term from the domain. If the precise domain term is less readable, use the everyday word.
  - Avoid unexplained abbreviations, but do not pad a name with extra words to be exact.
- Use camelCase for functions, variables, parameters, and properties.
- Use PascalCase for classes, interfaces, and types.
- Exceptions: names dictated by an external API, framework, or language convention (for example, JSON fields from a third-party service, or file names a tool expects).
  - Keep the exception local and add a comment if the reason is not obvious.
- Avoid excessive ternary operators.
  - A single, simple ternary is fine when it fits on one line.
  - Do not nest or chain ternaries.
  - For three or more branches, use `if`/early return, `switch`, or a lookup object.

## Types and interfaces

- Do not create a type just for the sake of it.
  - If a shape is used once, inline it or let inference handle it.
  - Add a named type only when it is reused, exported, or makes a boundary clearer.
- Do not make one type do too much.
  - If a single type cannot model a problem or an output cleanly, define two.
  - For example, use separate types for a success result and a failure result instead of one type full of optional fields.
- Do not use `any`.
  - Use `unknown` and narrow it at the boundary (parsing, validation, type guards).
- Do not use `as` casts or `// @ts-ignore` / `// @ts-expect-error` to get around the type checker.
  - If the types fight you, fix the underlying shape.
  - If a cast is truly unavoidable, add a comment explaining why it is safe.
- Do not carve types down with utility types such as `Pick`, `Omit`, `Exclude`, `Extract`, or with mapped and conditional types.
  - Define the small type you need directly, or restructure the data so the narrowing is unnecessary.

## Modules and dependencies

- Avoid circular imports.
- Add a new dependency only when the standard library or existing dependencies cannot reasonably cover the need.
- <!-- TODO: document ownership and import direction between modules once the structure settles. -->

## Testing

- Test observable behavior and public contracts, not internal implementation details.
- Cover known edge cases, especially any marked with an `EDGE CASE` comment in the code.
- Run `pnpm lint` for static checks and `pnpm test:int` for integration coverage. Run Playwright tests when a change affects browser-visible or Admin UI behavior.

## Documentation and comments

- Add quick inline comments so the reader knows what is happening without tracing every line. Keep them short.
- Use comments to flag things the code cannot say on its own, with a consistent prefix:
  - `// NOTE:` a quirk, surprising behavior, or documentation caveat.
  - `// EDGE CASE:` a known error condition or boundary that is handled (or deliberately not handled).
  - `// TODO:` work that is left to do. Say what is needed, not just that something is.
- Do not restate the code. `// increment i` adds nothing.
- Update or remove a comment when the code beneath it changes.

## Generated code

- Mark generated files clearly (for example, a header comment naming the generator).
- Do not edit generated files by hand. Change the source and regenerate.
- <!-- TODO: add the regeneration command and review expectations. -->
