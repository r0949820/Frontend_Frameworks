import styled from 'styled-components'
import {FunctionComponent} from 'react'

const Card = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #18191A;
  color: white;
`

const Avatar = styled.img`
  margin-right: 0.5em;
  height: 5em;
  margin-bottom: 0;
`

const Author = styled.div`
  font-size: 110%;
  color: #bdc4d0;
  margin: 0;
`

const CommentContent = styled.div`
  margin: 0;
  color: #6c757d;
  width: 100%;
`

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const MoreLessBtn = styled.div`
  font-size: 110%;
  text-decoration: underline;
  color: #6b6b6f;
  cursor: pointer;
  margin: 0;
`

interface CommentSectionProps {
    firstName: string
    lastName: string
    content: string
    isOpen: boolean
    setIsOpen: () => void
}

const CommentSection: FunctionComponent<CommentSectionProps> = ({firstName, lastName, content, isOpen, setIsOpen}) => {
    if (!isOpen) {
        content = `${content.substring(0, 30)}...`
    }

    return (
        <SectionContainer>
            <Author>
                {firstName} {lastName}
            </Author>
            <CommentContent>
                {content}
            </CommentContent>
            <MoreLessBtn onClick={setIsOpen}>Show {isOpen ? 'less' : 'more'}</MoreLessBtn>
        </SectionContainer>
    )
}

interface CommentCardProps {
    avatar: string
}

const CommentCard: FunctionComponent<CommentCardProps & CommentSectionProps> = ({avatar, ...rest}) => {
    return (
        <Card>
            <Avatar src={avatar}/>
            <CommentSection {...rest}/>
        </Card>
    )
}

export default CommentCard
