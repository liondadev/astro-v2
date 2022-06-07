import { extendTheme } from "@chakra-ui/react"

// We use this theme for the brand: https://coolors.co/e8c547-30323d-4d5061-5c80bc-cdd1c4
const colors = {
    brand: {
        primary: '#E8C547',
        secondary: '#30323D',
        tertiary: '#4D5061',
        quaternary: '#4D5061',
        quinary: '#5C80BC',
        senary: '#CDD1C4',
    }
}

const config = {
    initalColorMode: 'dark',
    useSystemColorMode: true,
}

export default extendTheme({ colors, config })
