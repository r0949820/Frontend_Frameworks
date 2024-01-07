import {FunctionComponent} from 'react'
import {useNavigate} from 'react-router-dom'
import {Button, Col, Row} from 'react-bootstrap'

const Home: FunctionComponent = () => {
    const navigate = useNavigate()

    return (
        <div className={'mt-2'}>
            <Row>
                <Col>
                    <h1>Welcome to the collaborative note editor</h1>
                </Col>
            </Row>
            <Row className={'mt-3'}>
                <Col>
                    <div className="d-grid gap-2">
                        <Button variant="primary" size="lg" onClick={() => navigate('/filesystem')}>
                            Test drive the app without logging in!
                        </Button>
                    </div>
                </Col>
                <Col>
                    <div className="d-grid gap-2">
                        <Button variant="primary" size="lg" onClick={() => navigate('/login')}>
                            Log in to start creating notes
                        </Button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Home
