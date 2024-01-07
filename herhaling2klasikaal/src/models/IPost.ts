import {IProfile} from './IProfile.ts'

interface IPost {
    id: string
    createdAt: Date
    content: string
    userId: string
    groupId: string
    parentId: string | null
    title: string | null
    comments?: IPost[]
    user?: IProfile | null
}

export default IPost
