import {FunctionComponent} from 'react'
import {Button, Card, Col, Row} from 'react-bootstrap'

interface QuestionProps {
    country: string
    answers: string[]
    currentQuestion: number
    numberOfQuestions: number
    score: number
    answerQuestion: (answer: string) => void
}

const Question: FunctionComponent<QuestionProps> = ({country, answers, currentQuestion, numberOfQuestions, score, answerQuestion}) => {
    return (
        <div className="mt-2">
            <Row>
                <Col className="text-start"><h3>Question: {currentQuestion + 1}/{numberOfQuestions}</h3></Col>
                <Col className="text-end"><h3>Score: {score}/{numberOfQuestions}</h3></Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>What is the capitol of {country}</Card.Title>
                            {answers.map(a => (
                                <div className="d-grid" key={a}>
                                    <Button className="my-1" onClick={() => answerQuestion(a)}>{a}</Button>
                                </div>
                            ))}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Question