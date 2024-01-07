import {FunctionComponent} from 'react'
import {Button, Col, Row} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'

interface HomeProps {

}

const Home: FunctionComponent<HomeProps> = () => {
    const navigate = useNavigate()

    return (
        <Row>
            <Col>
                <p>Practice your capitals and become a geography pro!</p>
                <div className="d-grid gap-2">
                    <Button variant="primary" onClick={() => navigate('/game')}>
                        Practice
                    </Button>
                </div>
            </Col>
            <Col>
                <p>Want to know more about how other people are better than you? Click here!</p>
                <div className="d-grid gap-2">
                    <Button variant="primary" onClick={() => navigate('/highscores')}>
                        Highscores
                    </Button>
                </div>
            </Col>
        </Row>
    )
}

export default Home