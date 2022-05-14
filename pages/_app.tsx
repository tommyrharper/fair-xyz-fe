import "../styles/index.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";
import { NextPageWithLayout } from "../utils/types";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout<{}>;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const apolloClient = useApollo(pageProps);
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <ApolloProvider client={apolloClient}>
      {getLayout(<Component {...pageProps} />)}
    </ApolloProvider>
  );
}

export default MyApp;
