import '@/styles/globals.scss'
import { Provider } from 'react-redux'
import store from '@/store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
let persistor = persistStore(store)
export default function App ({
  Component,
  pageProps: { session, ...pageProps }
}) {
  return (
    <>
      <Head>
        <title>payShop</title>
        <meta
          name='description'
          content='PayShop - online shopping service for all of your needs'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <SessionProvider session={session}>
        <Provider store={store}>
          <PersistGate Loading={null} persistor={persistor}>
            <PayPalScriptProvider
              deferLoading={true}
              options={{ 'client-id': process.env.PAYPAL_CLIENT_ID }}
            >
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />
              <Component {...pageProps} />
            </PayPalScriptProvider>
          </PersistGate>
        </Provider>
      </SessionProvider>
    </>
  )
}
