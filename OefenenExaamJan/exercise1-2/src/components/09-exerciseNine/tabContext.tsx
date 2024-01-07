import {createContext} from 'react'

interface TabContext {
    activeTab: string
    setActiveTab: (newActiveTab: string) => void
}

const TabContext= createContext<TabContext>({
    activeTab: '',
    setActiveTab: () => {
        console.warn('No implementation availeble for setActiveTab, please provide one')
    },
})

export default TabContext