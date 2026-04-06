/* Vite ?url suffix — returns the resolved asset URL as a string */
declare module '*.glb?url' {
  const src: string;
  export default src;
}

declare module '*.glb' {
  const src: string;
  export default src;
}
