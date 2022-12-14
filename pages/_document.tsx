import Document, { Html, Head, Main, NextScript } from "next/document";
import { Meta } from "@/components/Meta";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <Meta />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
