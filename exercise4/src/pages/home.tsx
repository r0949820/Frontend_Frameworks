import {FunctionComponent, Suspense} from 'react'
import {IEndpoint} from '../models/IEndpoint.ts'
import {Tab, Tabs} from 'react-bootstrap'
import styled from "styled-components";
import LoadingPage from '../utils/loadingPage.tsx'

interface StyledTabsWrapperProps {
    $darkTheme: boolean
}

const StyledTabsWrapper = styled.div<StyledTabsWrapperProps>`
  background-color: ${props => props.$darkTheme ? '#1d2025' : 'white'};

  ul > li > button, li {
    background-color: ${props => props.$darkTheme ? '#1d2025' : 'white'} !important;
    border-bottom: 1px solid ${props => props.$darkTheme ? '#228f61' : '#1d3e9a'} !important;
  }

  ul > li > button:hover, ul > li > button.active, ul > li > button:active, ul > li > button:focus {
    border: 1px solid ${props => props.$darkTheme ? '#228f61' : '#1d3e9a'} !important;
    color: ${props => props.$darkTheme ? '#228f61' : '#1d3e9a'} !important;
  }

  ul {
    border-bottom: 2px solid ${props => props.$darkTheme ? '#228f61' : '#1d3e9a'} !important;
  }
`

const endpoints = [
    {
        id: 0,
        title: 'Top Stories',
        endpoint: 'topstories.json',
    },
    {
        id: 1,
        title: 'Ask Hacker News',
        endpoint: 'askstories.json',
    },
    {
        id: 2,
        title: 'Show Hacker News',
        endpoint: 'showstories.json',
    },
    {
        id: 3,
        title: 'Jobs',
        endpoint: 'jobstories.json',
    },
]

interface HomeProps {

}

const Home: FunctionComponent<HomeProps> = () => {
    return (
        <>
        <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
        >
            {endpoints.map(e => (
                <Tab eventKey={e.endpoint} title={e.title} key={e.id}>
                    <Suspense fallback={<LoadingPage/>}>

                    </Suspense>
                </Tab>
            ))}

        <Tab eventKey="setting" title="Setting">

        </Tab>
        </Tabs>
        </>
    )
}

export default Home