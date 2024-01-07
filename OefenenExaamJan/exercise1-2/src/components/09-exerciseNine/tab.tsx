import {FunctionComponent, useContext} from 'react'
import TabButton from './tabButton.tsx'
import TabContext from './tabContext.tsx'

interface TabProps {
    name: string
    tabKey?: string
}

const Tab: FunctionComponent<TabProps> = ({name,tabKey}) => {
    const {activeTab, setActiveTab} = useContext(TabContext)

    if (!tabKey) {
        tabKey = name
    }

    return (
        <TabButton $isActive={activeTab == tabKey} onClick={() => setActiveTab(tabKey as string)}>
            {name}
        </TabButton>
    )
}

export default Tab