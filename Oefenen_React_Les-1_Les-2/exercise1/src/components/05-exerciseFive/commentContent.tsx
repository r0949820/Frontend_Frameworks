import {FunctionComponent} from 'react'
import styled from 'styled-components'

const ShowLessMore = styled.div`

  font-size: 110%;
  text-decoration: underline;
  color: #6b6b6f;
  cursor: pointer;
  margin: 0;
`

interface CommentContentProps {
    content: string
    isOpen:boolean
    toggleOpen: () => void
}

const CommentContent: FunctionComponent<CommentContentProps> = ({content, isOpen, toggleOpen}) => {
    return (
        <div className='content'>
            {isOpen ? content : `${content.slice(0, 30)}...`}
            <ShowLessMore onClick={toggleOpen}>
                {isOpen ? 'Show less' : 'Show more'}
            </ShowLessMore>
        </div>
    )
}

export default CommentContent