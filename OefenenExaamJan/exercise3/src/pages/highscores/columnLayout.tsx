import {FunctionComponent} from 'react'
import {Col, ListGroup, Row} from 'react-bootstrap'
import {getAllRegions} from '../../api/capitalsAPI.ts'
import HighscoreList from './highscoreList.tsx'


// const StyledCol: typeof Col = styled(Col)`
//     max-height: 80vh !important;
//     overflow: scroll;
// `

interface ColumnLayoutProps {
    region?: string
    setRegion: (newRegion: string) => void
}

const ColumnLayout: FunctionComponent<ColumnLayoutProps> = ({region, setRegion}) => {
    return (
        <Row>
            <Col sm={4} className="overflow-scroll">
                <h3>Regions</h3>

                <ListGroup variant="flush">
                    {getAllRegions().map(r => (
                        <ListGroup.Item key={r} action
                                        onClick={() => setRegion(r)}
                                        active={r === region}>
                            {r}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Col>
            <Col sm={8} className="overflow-scroll">
                <h3>Highscores</h3>
                <HighscoreList region={region}/>
            </Col>
        </Row>
    )
}

export default ColumnLayout