import {FunctionComponent} from 'react'
import {Col, Row} from 'react-bootstrap'

interface UnderConstructionProps {

}

const UnderConstruction: FunctionComponent<UnderConstructionProps> = () => {
    return (
        <Row className={'mt-4 ms-4'}>
            <Col>
                <p>Sorry, deze pagina is nog niet ontwikkeld.</p>
                <p>
                    Deze site is slechts een prototype om investeerders te lokken (het gaat niet goed, dit is veel
                    moeilijker dan ik dacht...)
                </p>
            </Col>
        </Row>
    )
}

export default UnderConstruction