import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href='https://fonts.googleapis.com/css2?family=Open+Sans:wght@100;200;300;400;500;600;700;800;900&display=swap&family=Heebo:wght@700&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body>
          <iframe
            src='https://www.googletagmanager.com/ns.html?id=GTM-TP3NG66'
            height='0'
            width='0'
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
