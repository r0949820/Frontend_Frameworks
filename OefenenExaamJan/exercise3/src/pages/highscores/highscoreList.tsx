import {FunctionComponent} from 'react'
import {getHighscoresForLocation, getLastHighscoreName} from '../../api/highscoresAPI.ts'
import {ListGroup} from 'react-bootstrap'

interface HighscoreListProps {
    region?: string
}

const HighscoreList: FunctionComponent<HighscoreListProps> = ({region}) => {
    const username = getLastHighscoreName()

    return (
        <ListGroup variant="flush">
            {region && getHighscoresForLocation(region).map(h => (
                <ListGroup.Item key={h.id} active={username === h.name}>
                    {h.name} - {h.score}/{h.nbQuestions} - {Math.round(h.score/h.nbQuestions * 100)}%
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}

export default HighscoreList