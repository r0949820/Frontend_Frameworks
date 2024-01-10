import {createContext} from 'react'

interface SettingContextProps {
    darkTheme: boolean
    toggleDarkTheme: () => void
    refetchInterval: number
    setRefetchInterval: (newInterval: number) => void
}

const SettingContext = createContext<SettingContextProps>({
    darkTheme: true,
    refetchInterval: 5000,
    toggleDarkTheme: () => {
        console.log('Not implemented')
    },

    setRefetchInterval: ()=> {
        console.log('Not implemented')
    }
})

export default SettingContext