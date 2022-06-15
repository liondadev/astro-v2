import { VechaiProvider } from "@vechaiui/react";

function MyApp({ Component, pageProps }) {
  return (<VechaiProvider>
      <Component {...pageProps} />
    </VechaiProvider>)
}

export default MyApp
