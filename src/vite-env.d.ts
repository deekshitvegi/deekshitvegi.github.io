// FIX: Removed the reference to vite/client as it was causing a resolution error.
// The manual type definitions below provide the necessary types for import.meta.env.

// Add manual type definitions for import.meta.env to resolve TypeScript errors
// when the vite/client types are not automatically picked up. This allows
// access to environment variables like VITE_GEMINI_API_KEY.
interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}