declare module 'gsap/flip' {
  // Local shim to satisfy TypeScript module resolution on case-sensitive imports.
  // Types are intentionally loose to avoid casing conflicts with gsap's own d.ts files.
  export const Flip: any;
}
