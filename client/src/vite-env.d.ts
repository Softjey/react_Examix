/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SERVER_HTTP_URL: string;
  readonly VITE_SERVER_WS_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
