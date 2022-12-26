import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from 'store'
import { Layout } from 'components'
import '../styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>LOYLEN</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel="icon" href="/icon.svg" type="image"></link>
      </Head>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  )
}
