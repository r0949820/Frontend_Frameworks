import ReactDOM from 'react-dom/client'
import App from './app.tsx'
import {StrictMode} from 'react'
import {BrowserRouter} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import 'bootstrap/dist/css/bootstrap.min.css'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: import.meta.env.PROD,
            suspense: true,
                useErrorBoundary: false,
        },
    },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <App/>
              </QueryClientProvider>
      </BrowserRouter>
  </StrictMode>,
)
