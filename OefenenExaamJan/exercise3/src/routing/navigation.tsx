import {Container, Nav, Navbar} from 'react-bootstrap'
import {FunctionComponent} from 'react'
import {LinkContainer} from 'react-router-bootstrap'

const Navigation: FunctionComponent = () => {
    return (
        <Navbar bg="dark" expand="lg" variant="dark">
            <Container fluid>
                <LinkContainer to={'/'}>
                    <Navbar.Brand>Capitals</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <LinkContainer to={'/game'}>
                            <Nav.Link>Play the game</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to={'/highscores'}>
                            <Nav.Link>Highscores</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation
