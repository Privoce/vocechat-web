/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test";
    readonly PUBLIC_URL: string;
  }
}

declare module "*.wav" {
  const src: string;
  export default src;
}
declare module "*.avif" {
  const src: string;
  export default src;
}

declare module "*.bmp" {
  const src: string;
  export default src;
}

declare module "*.gif" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.jpeg" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.webp" {
  const src: string;
  export default src;
}

// fix type error: TS2307: Cannot find module '...svg?url' or its corresponding type declarations.
declare module "*.svg?url" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  import React = require("react");

  const value: React.SFC<React.SVGProps<SVGSVGElement>>;

  export = value;
}

declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}
declare module '@emoji-mart/react';

interface Window {
  ethereum: any;
}
