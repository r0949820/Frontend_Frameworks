import {FunctionComponent} from 'react'
import IPost from '../../../models/IPost.ts'
import {Card} from 'react-bootstrap'

const PostItem: FunctionComponent<IPost> = ({id, title, content, userId, groupId, user, createdAt}) => {

    return (
        <Card bg="secondary" text="light" className="p-2 my-2">
            <Card.Body>
                <div className="d-flex">
                    <div className="align-self-center me-3">
                        {/* AVATAR */}
                    </div>
                    <div className="flex-grow-1">
                        <div className="flex-grow-1">
                            <h4>{/* POST TITLE */}</h4>
                            <h6>By {/* USERNAME */} at {/* PUBLICATION DATE */}</h6>
                        </div>
                    </div>
                    <div className="align-self-start">

                    </div>
                </div>
                <div className="d-grid">
                    <p className="text-truncate">{/* POST CONTENT */}</p>
                </div>
            </Card.Body>
        </Card>
    )
}

export default PostItem
