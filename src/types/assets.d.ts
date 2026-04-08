/* Vite ?url suffix — returns the resolved asset URL as a string */
declare module '*.glb?url' {
  const src: string;
  export default src;
}

declare module '*.glb' {
  const src: string;
  export default src;
}

/* Image types */
declare module '*.jpg'  { const src: string; export default src; }
declare module '*.jpeg' { const src: string; export default src; }
declare module '*.png'  { const src: string; export default src; }
declare module '*.JPG'  { const src: string; export default src; }
declare module '*.JPG'  { const src: string; export default src; }
declare module '*.JPEG' { const src: string; export default src; }
declare module '*.PNG'  { const src: string; export default src; }
