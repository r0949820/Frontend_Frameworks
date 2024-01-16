import {FunctionComponent} from 'react'
import {Button, Card, Col} from 'react-bootstrap'
import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLaptop} from '@fortawesome/free-solid-svg-icons'
import IComputer from '../../../models/IComputer.ts'
import {useNavigate} from 'react-router-dom'


const ImageComputer = styled.div`
    font-size: 6rem;
    text-align: center;
`

interface ComputerProps extends IComputer{

}

const Computer: FunctionComponent<ComputerProps> = ({info, price, name, id}) => {
    const navigate = useNavigate()
    return (
        <>
            <Col sm={4}>
                <Card className="me-4 mb-4">
                    <Card.Header>{name}</Card.Header>
                    <Card.Body>
                        <ImageComputer>
                            <FontAwesomeIcon icon={faLaptop}/>
                        </ImageComputer>
                            <p>{info}</p>
                            <p><strong>€ {price}</strong></p>
                        <div className="d-grid">
                            <Button onClick={() => navigate(`/laptops/${id}`)} variant="primary">Details</Button>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </>
    )
}

export default Computer