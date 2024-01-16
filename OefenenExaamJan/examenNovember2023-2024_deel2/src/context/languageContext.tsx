import {createContext} from 'react'

interface LanguageContextProps {
    language: string
    setLanguage: (language: string) => void
}

const LanguageContext = createContext<LanguageContextProps>({
    language: 'en',
    setLanguage: () => {
        console.warn(`No implementation available for setLanguage, please provide one.`)
    },
})

export default LanguageContext
