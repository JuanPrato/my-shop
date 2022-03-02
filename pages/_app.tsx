import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/Header'
import Layout from '../components/Layout'
import CartProvider from '../components/providers/CartProvider'
import initAuth from '../initAuth';
import Footer from 'components/Footer'
import SnackProvider from 'components/providers/SnackProvider'
import DataProvider from 'components/providers/DataProvider'

initAuth();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <DataProvider>
        <SnackProvider>
          <CartProvider>
            <Header/>
            <div className="flex-grow flex flex-col">
              <Component {...pageProps} />
            </div>
            <Footer />
          </CartProvider>
        </SnackProvider>
      </DataProvider>
    </Layout>
  )
}

export default MyApp;
