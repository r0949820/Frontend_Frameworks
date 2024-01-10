import {FunctionComponent, Suspense, useState} from 'react'
import styled from 'styled-components'
import {useGetItem} from '../../api/hackerNewsAPI.ts'
import LoadingPart from '../../utils/loadingPart.tsx'

const CommentContent = styled.div`
    margin-left: 1.5em;
    border: .5px solid #455a64;
    padding: .5em;
    margin-bottom: 1em;
    width: 95%;
`
const NoStyleBtn = styled.button`
    background: unset;
    border: none;
`

interface CommentProps {
    id: number
}

const Comment: FunctionComponent<CommentProps> = ({id}) => {
    const {data: item} = useGetItem(id)
    const [isOpen, setIsOpen] = useState<boolean>(true)
    const [showChildren, setShowChildren] = useState<boolean>(false)

    return (
        <>
            <h4>
                <NoStyleBtn onClick={() => setIsOpen(x => !x)}>{isOpen ? <span>&and;</span> : <span>&or;</span>}</NoStyleBtn>
                By {item?.by} at {new Date((item?.time)! * 1000).toLocaleString()}
            </h4>
            {isOpen && <CommentContent>
                <p>
                    <div dangerouslySetInnerHTML={{__html: item?.text ?? ''}}/>
                </p>

                {item?.kids && !showChildren && <NoStyleBtn onClick={()=> setShowChildren(true)}>Show more comments ...</NoStyleBtn>}

                <Suspense fallback={<LoadingPart/>}>
                    {showChildren && item?.kids?.map(k => <Comment key={k} id={k}/>)}
                </Suspense>
            </CommentContent>}


        </>
    )
}

export default Comment