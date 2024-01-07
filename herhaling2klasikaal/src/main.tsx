import ReactDOM from 'react-dom/client'
import App from './app.tsx'
import {StrictMode} from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import {BrowserRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import ThemeProvider from './context/themeContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
        <ThemeProvider>
        <App />
        </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
