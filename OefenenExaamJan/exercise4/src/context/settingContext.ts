import {createContext} from 'react'

interface SettingContext {
    darkTheme: boolean
    setDarkTheme: (newValue: boolean) => void
    refetchInterval: number
    setRefetchInterval: (newValue: number) => void
}

const SettingContext = createContext({
    darkTheme: true,
    setDarkTheme: () => {
        console.log('Not implemented')
    },
    refetchInterval: 1000 * 60 * 5,
    setRefetchInterval: ()=> {
        console.log('Not implemented')
    }
})

export default SettingContext