import {FunctionComponent} from 'react'
import Tabs from './tabs.tsx'
import TabList from './tabList.tsx'
import Tab from './tab.tsx'
import TabPanel from './tabPanel.tsx'

interface ExerciseNineProps {

}

const ExerciseNine: FunctionComponent<ExerciseNineProps> = () => {
    return (
        <>
            <Tabs defaultActiveKey="tab1">
                <TabList>
                    <Tab name="Tab 1" tabKey="tab1"></Tab>
                    <Tab name="Tab 2"></Tab>
                    <Tab name="Tab 3"></Tab>
                    <Tab name="Tab 4"></Tab>
                </TabList>

                <TabPanel tabKey="tab1">
                    <h1>Tab 1 content</h1>
                </TabPanel>
                <TabPanel tabKey="Tab 2">
                    <h1>Tab 2 content</h1>
                </TabPanel>
                <TabPanel tabKey="Tab 3">
                    <h1>Tab 3 content</h1>
                </TabPanel>
                <TabPanel tabKey="Tab 4">
                    <h1>Tab 4 content</h1>
                </TabPanel>
            </Tabs>
        </>
    )
}

export default ExerciseNine