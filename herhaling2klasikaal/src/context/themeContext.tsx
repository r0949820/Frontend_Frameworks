import {createContext, FunctionComponent, PropsWithChildren, useState} from 'react'

interface ThemeContextProps {
    darkTheme: boolean
    toggleDarkTheme: () => void
}

export const ThemeContext = createContext<ThemeContextProps>({
    darkTheme: true,
    toggleDarkTheme: () => {
        throw  new Error('ToggleDarkTheme is not implemented')
    },
})

const ThemeProvider: FunctionComponent<PropsWithChildren> = ({children}) => {
    const [darkTheme, setDarkTheme] = useState(false)

    const toggleDarkTheme = () => setDarkTheme(x => {
        localStorage.darkTheme = !x
        return !x
    })

    return (
        <ThemeContext.Provider value={{darkTheme, toggleDarkTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider