import { Html, Head, Main, NextScript } from "next/document" ;
import Script from "next/script" ;

// Document
function Document(): JSX.Element
{
  return (
  <>
    <Html lang="en-PK">
      <Head>
        <meta name="author" content="Syed Muhammad Khizer" />
        <meta name="theme-color" content="#3B3A30" />

        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Oxygen&amp;display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Epilogue&amp;display=swap" />

        <link rel="icon" type="image/webp" sizes="16x16" href="../images/favicon/1.webp" />
        <link rel="icon" type="image/webp" sizes="32x32" href="../images/favicon/2.webp" />
        <link rel="icon" type="image/webp" sizes="180x180" href="../images/favicon/3.webp" />
        <link rel="icon" type="image/webp" sizes="192x192" href="../images/favicon/4.webp" />
        <link rel="icon" type="image/webp" sizes="512x512" href="../images/favicon/5.webp" />
        <link rel="shortcut icon" type="image/x-icon" href="../images/favicon/2.webp" />

        <link rel="manifest" href="../manifest.json" />
      </Head>

      <Main />
      <NextScript />

      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" strategy="lazyOnload" />
    </Html>
  </>
  )
}

// Export Document
export default Document ;