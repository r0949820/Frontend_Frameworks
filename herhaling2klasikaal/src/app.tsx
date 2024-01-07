import {FunctionComponent, useContext, useState} from 'react'
import {Col, Container, Row} from 'react-bootstrap'
import SideNav from './navigation/sideNav.tsx'
import {QueryClientProvider, QueryClient} from '@tanstack/react-query'
import Routing from './navigation/routing.tsx'
import {ThemeContext} from './context/themeContext.tsx'


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: import.meta.env.PROD,
            suspense: true,
            useErrorBoundary: false,
        },
    },
})

const App: FunctionComponent = () => {
    const [isExpanded, setIsExpanded] = useState(true)
    const {darkTheme} = useContext(ThemeContext)

    return (
        <QueryClientProvider client={queryClient}>

            <Container fluid className={`vh-100 bg-dark text-light`}>
                <Row className="h-100">
                    <Col md={isExpanded ? 3 : 2} lg={isExpanded ? 2 : 1}
                         className="border-end border-secondary vh-100 mx-auto d-flex justify-content-center">
                        <SideNav clickHandler={() => setIsExpanded(x => !x)} isExpanded={isExpanded}/>
                    </Col>
                    <Col className="vh-100">
                        <Row className="justify-content-center">
                            <Routing/>
                        </Row>
                    </Col>
                </Row>
            </Container>

        </QueryClientProvider>

    )
}

export default App
