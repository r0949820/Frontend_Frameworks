import {FunctionComponent} from 'react'
import {Outlet, Route, Routes} from 'react-router-dom'
import Home from '../pages/home/home.tsx'
import FileSystem from '../pages/filesystem/fileSystem.tsx'
import Login from '../pages/login/login.tsx'
import Notes from '../pages/notes/notes.tsx'
import NoteDetail from '../pages/notes/detail/noteDetail.tsx'

const Routing: FunctionComponent = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/filesystem" element={<FileSystem/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/notes" element={<Outlet/>}>
                <Route index element={<Notes/>}/>
                <Route path=":id" element={<NoteDetail/>}/>
            </Route>
        </Routes>
    )
}

export default Routing
