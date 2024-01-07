import {FunctionComponent} from 'react'

interface AvatarProps {
    avatarUrl: string
}

const Avatar: FunctionComponent<AvatarProps> = ({avatarUrl}) => {
    return (
        <img className='avatar' src={avatarUrl} alt='user avatar'/>
    )
}

export default Avatar