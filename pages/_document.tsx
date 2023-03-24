import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
    <Html>
      <Head>
        <meta name='description' content='CodeWithKatyRosli' />
        <link rel='icon' href='/Favicon.svg' />
        <link rel='apple-touch-icon'  sizes='192x192' href='logo192.svg' />
        <link rel='apple-touch-icon'  sizes='512x512' href='logo512.svg' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
    )
  }
}

export default MyDocument