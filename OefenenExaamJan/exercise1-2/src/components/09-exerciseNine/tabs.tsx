import {FunctionComponent, PropsWithChildren, useState} from 'react'
import TabContext from './tabContext.tsx'

interface TabsProps extends PropsWithChildren{
    defaultActiveKey:string
}

const Tabs: FunctionComponent<TabsProps> = ({children, defaultActiveKey}) => {
    const [activeTab, setActiveTab] = useState<string>(defaultActiveKey)

    return (
        <TabContext.Provider value={{activeTab, setActiveTab}}>
            {children}
        </TabContext.Provider>
    )
}

export default Tabs