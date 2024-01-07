import {FunctionComponent, ReactNode} from 'react'
import {Col, Row} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'
import BootstrapIcon from '../utils/bootstrapIcon'

const NavContainer: typeof Row = styled(Row)`
  *:focus {
    outline: none;
  }
`

interface NavItemProps {
    iconOnly: boolean
    icon: string
    url: string
    title: string
    isBrand: boolean
}

const NavItem: FunctionComponent<NavItemProps> = ({iconOnly, icon, url, title, isBrand}) => {
    const brandColumn = (
        <Col sm={12}>
            <hr/>
        </Col>
    )

    const Title = ({children}: {children: ReactNode}) => {
        return isBrand ? <h3>{children}</h3> : <h4>{children}</h4>
    }

    const addActiveClass = ({isActive}: {isActive: boolean}) => {
        return isActive ? 'text-secondary' : 'text-reset'
    }

    const textNav = (
        <Col sm={10}>
            <NavLink to={url}
                     className={x => `${addActiveClass(x)} text-decoration-none`}>
                <Title>{title}</Title>
            </NavLink>
        </Col>
    )

    return (
        <NavContainer>
            <Col sm={iconOnly ? 12 : 2} className="text-center ml-1">
                <NavLink to={url} className={addActiveClass}>
                    <Title><BootstrapIcon iconName={icon}/></Title>
                </NavLink>
            </Col>

            {!iconOnly && textNav}

            {isBrand && brandColumn}

        </NavContainer>
    )
}

export default NavItem
