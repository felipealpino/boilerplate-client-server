/// <reference types="vite/client" />

//USAGE EXAMPLE: import.meta.env.VITE_NODE_ENV
interface ImportMetaEnv {
  readonly VITE_NODE_ENV: string;
  readonly VITE_WEBSOCKET_URL: string;
}

// eslint-disable-next-line no-unused-vars
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
