import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.tsx'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const  queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: import.meta.env.PROD,
            suspense: true,
            useErrorBoundary: false,
        },
    },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
    <App />
      </QueryClientProvider>
  </React.StrictMode>,
)
