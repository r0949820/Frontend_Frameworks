import {createContext} from 'react'

interface ViewModeContextProps {
    viewMode: 'user' | 'admin'
    setViewMode: (newMode: 'user' | 'admin') => void
}

const ViewModeContext = createContext<ViewModeContextProps>({
    viewMode: 'user',
    setViewMode: () => {
        console.log('toggleViewMode not implemented')
    },
})

export default ViewModeContext