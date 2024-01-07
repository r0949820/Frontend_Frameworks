import {FunctionComponent} from 'react'
import Author from './author.tsx'
import CommentContent from './commentContent.tsx'

interface CommentSectionProps {
    firstName: string
    lastName: string
    content: string
    isOpen: boolean
    toggleOpen: () => void
}

const CommentSection: FunctionComponent<CommentSectionProps> = ({firstName, lastName, content, isOpen,toggleOpen}) => {
    return (
        <div className='commentSection'>
            <Author firstName={firstName} lastName={lastName}/>
            <CommentContent content={content} isOpen={isOpen} toggleOpen={toggleOpen}/>
        </div>
    )
}

export default CommentSection