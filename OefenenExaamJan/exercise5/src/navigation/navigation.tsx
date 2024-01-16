import {FunctionComponent} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useGetProfile, useSignOut} from '../api/users.ts'
import {Container, Nav, Navbar} from 'react-bootstrap'
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import {LinkContainer} from 'react-router-bootstrap'
import styled from 'styled-components'

const TextBtn = styled.span`
  &:hover {
    cursor: pointer;
  }
`

const Navigation: FunctionComponent = () => {
    const {data: profile} = useGetProfile()
    const {mutate} = useSignOut()

    const userInfo = (
        <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
                Welcome {profile?.username}
                <TextBtn onClick={() => mutate()} className="ms-2">
                    (<FontAwesomeIcon icon={faRightFromBracket} className="me-2"/>Log out)
                </TextBtn>
            </Navbar.Text>
        </Navbar.Collapse>
    )

    return (
        <Navbar bg="dark" expand="lg" variant="dark">
            <Container fluid>
                <LinkContainer to={'/'}>
                    <Navbar.Brand>To-Do</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <LinkContainer to="/">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/lists">
                            <Nav.Link>Lists</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
                {profile?.id && userInfo}
            </Container>
        </Navbar>
    )
}

export default Navigation
