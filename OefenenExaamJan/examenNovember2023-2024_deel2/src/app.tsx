import {FunctionComponent, useState} from 'react'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import LanguageContext from './context/languageContext.tsx'
import Navigation from './navigation/navigation.tsx'
import Routing from './navigation/routing.tsx'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            suspense: true,
            useErrorBoundary: false,
            refetchOnWindowFocus: import.meta.env.PROD,
        },
    },
})
const App: FunctionComponent = () => {
    const [language, setLanguage] = useState('en')

    return (
        <QueryClientProvider client={queryClient}>
            <LanguageContext.Provider value={{language, setLanguage}}>
                <Navigation/>

                <div className={'container'}>
                    <Routing/>
                </div>
            </LanguageContext.Provider>
        </QueryClientProvider>
    )
}

export default App
