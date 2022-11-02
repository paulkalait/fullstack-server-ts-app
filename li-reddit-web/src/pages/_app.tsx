import { ChakraProvider } from '@chakra-ui/react';

import { AppProps } from 'next/app';

function MyApp({ Component, }: AppProps) {
  return (
    <ChakraProvider >
      <Component/>
    </ChakraProvider>
  )
}

export default MyApp
