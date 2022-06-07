/*
    Custom App file - Helps impliment ChackraUI
*/

import { ChakraProvider } from '@chakra-ui/react'
import Theme from "../config/theme"

function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider resetCSS theme={Theme}>
            <Component {...pageProps} />
        </ChakraProvider>
    )
}

export default MyApp
