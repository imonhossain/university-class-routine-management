/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SERVICE_API: string;
  readonly VITE_DEBUG_API?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
