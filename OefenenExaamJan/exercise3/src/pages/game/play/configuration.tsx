import {FunctionComponent, useState} from 'react'
import {Button, Col, Row} from 'react-bootstrap'
import FormRange from 'react-bootstrap/FormRange'

interface ConfigurationProps {
    startNewGame: (nbQuestion: number) => void
    maxNumberOfQuestions: number
}

const Configuration: FunctionComponent<ConfigurationProps> = ({maxNumberOfQuestions, startNewGame}) => {
    const [numberOfQuestions, setNumberOfQuestions] = useState<number>(5)

    return (
        <>
            <Row>
                <Col>
                    <Button onClick={() => setNumberOfQuestions(x => Math.max(x - 1, 5))}>-</Button>
                </Col>
                <Col className="text-center">
                    Number of questions : {numberOfQuestions}
                </Col>
                <Col className="text-end">
                    <Button onClick={() => setNumberOfQuestions(x => Math.min(x + 1, maxNumberOfQuestions))}>+</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormRange value={numberOfQuestions} min={5} max={maxNumberOfQuestions}
                               onChange={(evt) => setNumberOfQuestions(Number(evt.target.value))}/>
                </Col>
            </Row>
            <Row>
                <Col className="d-grid">
                    <Button onClick={() => startNewGame(numberOfQuestions)}>Start a new game!</Button>
                </Col>
            </Row>
        </>
    )
}

export default Configuration