import {FunctionComponent} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar as starFull} from '@fortawesome/free-solid-svg-icons'
import {faStar as starOutline} from '@fortawesome/free-regular-svg-icons'

interface StarProps {
    full: boolean
}

const Star: FunctionComponent<StarProps> = ({full}) => {
    if (full) {
        return <FontAwesomeIcon icon={starFull}/>
    }
    return <FontAwesomeIcon icon={starOutline}/>
}

export default Star