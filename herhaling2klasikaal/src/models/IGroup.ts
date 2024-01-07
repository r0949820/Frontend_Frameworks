import {IProfile} from './IProfile.ts'

interface IGroup {
    id: string
    createdAt: Date
    name: string
    owner: IProfile
    isPrivate: boolean
    description: string
}

export default IGroup
