import {Suspense, StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container} from 'react-bootstrap'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import App from './app.tsx'
import Navigation from './navigation/navigation.tsx'
import LoadingPage from './utils/loadingPage.tsx'
import {BrowserRouter} from 'react-router-dom'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            suspense: true,
            useErrorBoundary: false,
            refetchOnWindowFocus: import.meta.env.PROD,
        },
    },
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Suspense fallback={<LoadingPage/>}>
                    <div className={'h-100 d-flex flex-column'}>
                        <Navigation/>
                        <Container className={'flex-grow-1 mt-5'}>
                            <App/>
                        </Container>
                    </div>
                </Suspense>
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>,
)
