import {FormEventHandler, FunctionComponent, useState} from 'react'
import {Button, Card, Col, Form, Row} from 'react-bootstrap'
import {addScore, getLastHighscoreName} from '../../../api/highscoresAPI.ts'
import {Link, useParams} from 'react-router-dom'

interface ResultProps {
    score: number
    numberOfQuestions: number
}

const Result: FunctionComponent<ResultProps> = ({score, numberOfQuestions}) => {
    const {chosenRegion} = useParams()
    const [username, setUsername] = useState<string>(getLastHighscoreName())
    const [scoreSaved, setScoreSaved] = useState<boolean>(false)

    const addToHighscores: FormEventHandler<HTMLFormElement> = (evt) => {
        evt.preventDefault()
        addScore(numberOfQuestions, score, chosenRegion!, username)
        setScoreSaved(true)
    }

    const form = (
        <Row className="mt-2">
            <Col>
                <Card>
                    <Card.Body>
                        <Card.Title>The end!</Card.Title>
                        <Card.Subtitle>You've scored {score}/{numberOfQuestions}</Card.Subtitle>

                        <Form onSubmit={addToHighscores}>
                            <Form.Group className="my-3">
                                <Form.Control type="text" value={username}
                                              onChange={evt => setUsername(evt.target.value)}
                                              placeholder="Your name"/>
                            </Form.Group>

                            <div className="d-grid">
                                <Button type="submit" disabled={username == ''}>
                                    Add to highscores!
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )

    const saved= (
        <div className="text-center mt-2">
            <h3>Your score has been saved!</h3>
            <Link to={`/highscores/${chosenRegion}`}>Highscores</Link>
        </div>
    )

    return scoreSaved ? saved : form
}

export default Result