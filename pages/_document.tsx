import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta
          name="description"
          content="Download any YouTube video in video (mp4) or audio (m4a) format instantly!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="author" content="Ryan Zhu" />

        <meta property="og:url" content="https://downloadyt.vercel.app/" />
        <meta property="og:site_name" content="DownloadYT" />
        <meta property="og:title" content="DownloadYT" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Download any YouTube video in video (mp4) or audio (m4a) format instantly!"
        />
        <meta property="og:locale" content="en_US" />

        <meta property="og:image" content="/downloadyt.png" />
        <meta property="og:image:alt" content="DownloadYT" />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Ryan Zhu" />
        <meta name="keywords" content="download, youtube, video, audio" />
        <meta name="theme-color" content="#B93437" />
        <meta name="msapplication-navbutton-color" content="#B93437" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#B93437" />
        <meta name="msapplication-TileColor" content="#B93437" />
        <meta name="msapplication-TileImage" content="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
