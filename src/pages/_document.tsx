import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';
import { getUserTheme } from 'src/utils/theme';

class MyDocument extends Document {
  render() {
    return (
      <Html className={getUserTheme() || ''}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
