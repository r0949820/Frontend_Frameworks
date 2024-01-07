import {FunctionComponent, PropsWithChildren, useContext} from 'react'
import TabPanelContentContainer from './tabPanelContentContainer.tsx'
import tabContext from './tabContext.tsx'

interface TabPanelProps extends PropsWithChildren{
    tabKey: string
}

const TabPanel: FunctionComponent<TabPanelProps> = ({children, tabKey}) => {
    const {activeTab} = useContext(tabContext)

    return (
        <TabPanelContentContainer $isActive={tabKey == activeTab}>
            {children}
        </TabPanelContentContainer>
    )
}

export default TabPanel