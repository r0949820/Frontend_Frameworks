import {FunctionComponent} from 'react'

interface BootstrapIconProps {
    iconName: string
}

const BootstrapIcon: FunctionComponent<BootstrapIconProps> = ({iconName}) => {
    return (
        <>
            <i className={`bi bi-${iconName} me-2`}/>
        </>
    )
}

export default BootstrapIcon
