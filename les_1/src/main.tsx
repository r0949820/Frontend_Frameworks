import ReactDOM from 'react-dom/client'
import {StrictMode} from 'react'

import './assets/main.css'
import App from './app.tsx'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
)

root.render(
    <StrictMode>
        <App/>
    </StrictMode>,
)
