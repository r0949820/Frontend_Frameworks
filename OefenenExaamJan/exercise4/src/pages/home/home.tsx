import {FunctionComponent, useContext} from 'react'
import {Tab, Tabs} from 'react-bootstrap'
import StyledTabsWrapper from '../../components/styledTabsWrapper.tsx'
import SettingContext from '../../context/settingContext.tsx'
import Settings from './settings.tsx'
import TopItems from './topItems.tsx'
import {IEndpoint} from '../../models/IEndpoint.ts'


const endpoints: IEndpoint[] = [
    {
        id: 0,
        title: 'Top Stories',
        endpoint: 'topstories',
    },
    {
        id: 1,
        title: 'Ask Hacker News',
        endpoint: 'askstories',
    },
    {
        id: 2,
        title: 'Show Hacker News',
        endpoint: 'showstories',
    },
    {
        id: 3,
        title: 'Jobs',
        endpoint: 'jobstories',
    },
]


interface HomeProps {

}

const Home: FunctionComponent<HomeProps> = () => {
    const {darkTheme} = useContext(SettingContext)

    return (
        <StyledTabsWrapper $darkTheme={darkTheme}>
            <Tabs
                defaultActiveKey={endpoints[0].endpoint} className="mb-3" fill>
                {endpoints.map(e => (
                    <Tab eventKey={e.endpoint} title={e.title} key={e.id}>
                           <TopItems endpoint={e.endpoint}/>
                    </Tab>
                ))}
                <Tab eventKey="Settings" title="Settings">
                    <Settings/>
                </Tab>
            </Tabs>
        </StyledTabsWrapper>
    )
}

export default Home