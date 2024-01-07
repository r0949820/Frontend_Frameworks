import {FunctionComponent} from 'react'
import IGroup from '../../models/IGroup.ts'
import {Card} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

const GroepItem: FunctionComponent<IGroup> = ({id, name, owner, description}) => {
    return (
        <Card  bg={'light'} className={'text-dark mb-2 w-100'}>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Created by {owner.username}</Card.Subtitle>
                <Card.Text>
                    {description}
                </Card.Text>
                <LinkContainer to={id}>
                    <Card.Link>View group</Card.Link>
                </LinkContainer>
            </Card.Body>
        </Card>
    )
}

export default GroepItem
