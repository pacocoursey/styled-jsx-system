import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />

          <style jsx global>{`
            * {
              box-sizing: border-box;
            }

            html,
            body {
              padding: 0;
              margin: 0;
            }

            body {
              min-height: 100vh;
            }
          `}</style>
        </body>
      </Html>
    )
  }
}

export default MyDocument
