import React, { ReactElement } from "react";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentInitialProps,
  DocumentContext,
} from "next/document";
import Footer from "../components/Footer";

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
    };
  }

  render(): ReactElement {
    return (
      <Html lang="en">
        <Head></Head>
        <body>
          <Main />
          <Footer />
          <NextScript />
        </body>
      </Html>
    );
  }
}
