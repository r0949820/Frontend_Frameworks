import {FunctionComponent} from 'react'
import {Card, Col, Container, ListGroup, ListGroupItem, Row} from 'react-bootstrap'
import {Link, Navigate, useParams} from 'react-router-dom'
import {getCategoryName, getCategoryValue, getComputer} from '../../../api/dataApi.ts'


interface DetailPageProps {

}

const DetailPage: FunctionComponent<DetailPageProps> = () => {
    const {id} = useParams()
    const computer = getComputer(id)

    if (!computer) return <Navigate to={'/'}/>

    return (
        <Container className="mt-5">
            <Card>
                <Card.Header>{computer?.name}</Card.Header>
                <Row className="g-0">
                    <Col>
                        <ListGroup variant="flush">
                            {Object.keys(computer?.options).map(c => <ListGroupItem
                                key={c}>{getCategoryName(c)}</ListGroupItem>)}
                        </ListGroup>
                    </Col>
                    <Col>
                        <ListGroup variant="flush">
                            {Object.keys(computer?.options).map(c => <ListGroupItem
                                key={c}>{getCategoryValue(c, computer.options[c])}</ListGroupItem>)}
                        </ListGroup>
                    </Col>
                </Row>
                <Card.Footer>
                    <Link to="/laptops">Back</Link>
                </Card.Footer>
            </Card>
        </Container>
    )
}

export default DetailPage