interface Window {
  dataLayer: any[];
}

declare function gtag(...args: any[]): void;

// This ensures the file is treated as a module, preventing conflicts with other global types
export {};