
import { globalStyles } from '@/styles/global'
import type { AppProps } from 'next/app'
import Logo from '../assets/Logo.svg'
import { Container} from '@/styles/pages/app';
import Image from 'next/image';
import Header from '@/components/header/header';
import { CartContextProvider } from '@/contexts/CartContext';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartContextProvider>
      <Container>
        <Header/>
        <Component {...pageProps} />
      </Container>
    </CartContextProvider>
  )
}
