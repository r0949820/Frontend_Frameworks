import {IProfile} from './IProfile.ts'

interface IToDoList {
    id: number
    isPrivate: boolean
    name: string
    ownerId: string
    owner: IProfile | null
}

export default IToDoList
