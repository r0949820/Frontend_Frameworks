import {FunctionComponent} from 'react'
import styled from 'styled-components'
import {Container, Nav, Navbar} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faRightFromBracket, faRightToBracket} from '@fortawesome/free-solid-svg-icons'
import {LinkContainer} from 'react-router-bootstrap'
import {useGetProfile, useSignOut} from '../API/users.ts'

const TextBtn = styled.span`
  &:hover {
    cursor: pointer;
  }
`

const Navigation: FunctionComponent = () => {
    const {data: profile} = useGetProfile()
    const username = profile?.username
    const id = profile?.id
    const {mutate: signOut} = useSignOut()

    const userInfo = (
        <Navbar.Text>
            Welcome {username} &nbsp;
            <TextBtn style={{color: 'white'}} onClick={() => signOut()}>
                (<FontAwesomeIcon icon={faRightFromBracket}/> Log out)
            </TextBtn>
        </Navbar.Text>
    )

    const loginButton = (
        <Nav>
            <LinkContainer to="/login">
                <Nav.Link>
                    <FontAwesomeIcon icon={faRightToBracket}/> Log in
                </Nav.Link>
            </LinkContainer>
        </Nav>
    )

    return (
        <Navbar bg="dark" expand="lg" variant="dark">
            <Container fluid>
                <LinkContainer to={'/'}>
                    <Navbar.Brand>Markdown Notes</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <LinkContainer to="/filesystem">
                            <Nav.Link>Folders</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/notes">
                            <Nav.Link>My Notes</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    {id ? userInfo : loginButton}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation
