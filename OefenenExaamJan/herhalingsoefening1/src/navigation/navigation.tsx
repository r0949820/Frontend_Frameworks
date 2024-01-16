import {FunctionComponent} from 'react'
import {Container, Nav, Navbar as BootstrapNavbar} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

interface NavigationProps {

}

const Navigation: FunctionComponent<NavigationProps> = () => {
    return (
        <>
            <BootstrapNavbar bg="dark" expand="lg" variant="dark">
                <Container fluid>
                    <LinkContainer to={'/'}>
                        <BootstrapNavbar.Brand>Small webshop</BootstrapNavbar.Brand>
                    </LinkContainer>
                    <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav"/>
                    <BootstrapNavbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            <LinkContainer to={'/laptops'}>
                                <Nav.Link>Laptops</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={'/smartphones'}>
                                <Nav.Link>Smartphones</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={'/kitchen'}>
                                <Nav.Link>Keukens</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={'/washing-machines'}>
                                <Nav.Link>Keukens</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={'/about'}>
                                <Nav.Link>About</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </BootstrapNavbar.Collapse>
                </Container>
            </BootstrapNavbar>
        </>
    )
}

export default Navigation