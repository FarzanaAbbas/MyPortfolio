import {
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
           <meta name="google-site-verification" content="RvyIddRCrCZzl4NajhpQaw2PeC6p639d223cby_ADms" />
           
       <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XZR5DK6G3B"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XZR5DK6G3B');
            `,
          }}
        />
        </Head>
    
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
