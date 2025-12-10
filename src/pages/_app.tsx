// src/pages/_app.tsx

import type { AppProps } from 'next/app';
import Script from 'next/script'; // <-- 1. Import next/script

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* 2. External Library Loader */}
      <Script 
        strategy="afterInteractive" // Loads the main gtag.js library file
        src="https://www.googletagmanager.com/gtag/js?id=G-XZR5DK6G3B" 
      />

      {/* 3. Inline Configuration Code */}
      <Script
        id="google-analytics-init" // Unique ID is required by next/script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-XZR5DK6G3B');
          `,
        }}
      />
      
      {/* 4. Render the rest of your app */}
      <Component {...pageProps} />
    </>
  );
}