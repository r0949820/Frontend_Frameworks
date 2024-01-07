import {FunctionComponent} from 'react'
import {Button, Col, Container, Form} from 'react-bootstrap'
import StyledRow from '../../../../utils/styledRow.tsx'
import IPost from '../../../../models/IPost.ts'

interface PostDetailProps {

}

const PostDetail: FunctionComponent<PostDetailProps> = () => {
    return (
        <Container fluid className="pe-0">
            <StyledRow className="pt-4 mx-1">
                <Col sm={12}>
                    Title
                </Col>

                <Col sm={12}>
                    Content
                </Col>

                <Col sm={12} className="pt-4 mx-1">
                    <hr/>
                    <h3>Comments</h3>
                </Col>

                <Col sm={12} className="mx-1 d-grid">
                    <Form.Group className="mb-3">
                        <Form.Label>Write a new comment</Form.Label>
                        <Form.Control placeholder="New comment" as="textarea" rows={6}/>
                    </Form.Group>
                    <Button variant="primary" >Place comment</Button>
                </Col>

                <Col sm={12} className="mx-1 mt-4">
                    {post?.comments?.map(c => <Comment key={c.id ?? 'temp'} {...c}/>)}
                </Col>
            </StyledRow>
        </Container>
    )
}

export default PostDetail
