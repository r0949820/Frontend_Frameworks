import {FunctionComponent} from 'react'
import Avatar from './Avatar.tsx'
import CommentSection from './commentSection.tsx'
import {IComment} from '../models/IComment.ts'

interface CommentCardProps extends IComment {
    isOpen: boolean
    toggleOpen: () => void
}

const CommentCard: FunctionComponent<CommentCardProps> = ({avatar, ...rest}) => {
    return (
        <div className="card">
            <Avatar avatarUrl={avatar}/>
            <CommentSection {...rest}/>
        </div>
    )
}

export default CommentCard