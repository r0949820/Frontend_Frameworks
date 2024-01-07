import {FunctionComponent, useContext} from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import NavItem from './navItem.tsx'
import BootstrapIcon from '../utils/bootstrapIcon.tsx'
import {ThemeContext} from '../context/themeContext.tsx'

interface SideNavProps {
    clickHandler: () => void
    isExpanded: boolean
}

const SideNav: FunctionComponent<SideNavProps> = ({clickHandler, isExpanded}) => {
    const {darkTheme, toggleDarkTheme} = useContext(ThemeContext)
    const {isAuthenticated, profile} = {isAuthenticated: true, profile: null}

    const userNav = () => {
        if (isAuthenticated) {
            return (
                <>
                    <NavItem url={'/user'} icon={'person-fill'} title={`${profile}`} isBrand={false}
                             iconOnly={!isExpanded}/>
                    <NavItem url={'/groups'} icon={'people-fill'} title={'Groups'} isBrand={false}
                             iconOnly={!isExpanded}/>
                    <NavItem url={'/chat'} icon={'chat-fill'} title={'Chat'} isBrand={false} iconOnly={!isExpanded}/>
                </>
            )
        }
        return (
            <NavItem url={'/login'} icon={'box-arrow-in-right'}
                     title={'Log in'} isBrand={false} iconOnly={!isExpanded}/>
        )
    }

    return (
        <Row className="d-flex flex-column align-content-stretch h-100 w-100 g-0">
            <Col className="flex-grow-1 mt-4 g-0">
                <NavItem url={'/'} icon={'house-door-fill'} title={'Social Network'} isBrand={true}
                         iconOnly={!isExpanded}/>
                {userNav()}
            </Col>
            <Col className="flex-grow-0 g-0">
                <Row className="g-0">
                    <Col xs={10} className={`d-flex justify-content-center m-0`}>
                        <Form.Check type="switch" label={isExpanded ? 'Dark Theme' : ''}
                                    checked={darkTheme}
                                    onChange={toggleDarkTheme}/>
                    </Col>
                    <Col className={`d-flex ${isExpanded ? '' : 'justify-content-center'}`} xs={isExpanded ? 2 : 12}>
                        <h4 onClick={clickHandler}>
                            {isExpanded ? <BootstrapIcon iconName="arrow-left"/> :
                                <BootstrapIcon iconName="arrow-right"/>}
                        </h4>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default SideNav
