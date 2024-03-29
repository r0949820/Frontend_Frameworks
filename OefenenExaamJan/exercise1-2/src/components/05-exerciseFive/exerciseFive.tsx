import IComment from '../models/IComment.ts'
import CommentCard from './commentCard.tsx'
import {FunctionComponent, useState} from 'react'

const comment1: IComment = {
    id: 'ebba06aa-649c-40b8-ad38-d517f45fc843',
    firstName: 'Evangeline',
    lastName: 'Mcintyre',
    avatar: 'https://via.placeholder.com/150',
    content: 'Nisi ipsum anim reprehenderit ex id laboris sunt deserunt quis. Id velit aliqua commodo reprehenderit nostrud sit elit exercitation mollit proident amet et amet. Do reprehenderit tempor tempor excepteur fugiat irure anim deserunt elit incididunt ut cillum dolore.',
}

const comment2: IComment = {
    id: 'e3c21e32-df68-4d77-b594-18a2d4ee18f9',
    firstName: 'Dudley',
    lastName: 'Gates',
    avatar: 'https://via.placeholder.com/150',
    content: 'Reprehenderit sunt enim dolore cillum. Proident Lorem commodo ea duis tempor ipsum dolore in magna aliquip reprehenderit esse. Consequat do fugiat veniam esse anim ullamco eu pariatur laboris ullamco velit excepteur ipsum. Ea consectetur quis anim fugiat fugiat veniam Lorem exercitation Lorem aliqua do.',
}

const ExerciseFive: FunctionComponent = () => {
    const [isOpen, setIsOpen] = useState<string | null>(null)
    const openCloseHandler = (id: string | null) => {
        if (isOpen === id) {
            setIsOpen(null)
        } else {
            setIsOpen(id)
        }
    }

    return (
        <>
            <CommentCard {...comment1} isOpen={isOpen === comment1.id} setIsOpen={() => openCloseHandler(comment1.id)}/>
            <hr/>
            <CommentCard {...comment2} isOpen={isOpen === comment2.id} setIsOpen={() => openCloseHandler(comment2.id)}/>
        </>
    )
}

export default ExerciseFive

