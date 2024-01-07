import {FunctionComponent, Suspense} from 'react'
import LoadingPage from '../utils/loadingPage.tsx'
import {Outlet, Route, Routes} from 'react-router-dom'
import Home from '../pages/home/home.tsx'
import Login from '../pages/login/login.tsx'
import User from '../pages/user/user.tsx'
import Group from '../pages/group/group.tsx'
import GroupDetails from '../pages/group/detail/groupDetails.tsx'
import PostDetail from '../pages/group/detail/postDetail.tsx'
import EditMembers from '../pages/group/detail/editMembers.tsx'
import Chat from '../pages/chat/chat.tsx'


interface RoutingProps {

}

const Routing: FunctionComponent<RoutingProps> = () => {
    return (
        <Suspense fallback={<LoadingPage/>}>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/user'} element={<User/>}/>
                <Route path={'/groups'} element={<Outlet/>}>
                    <Route index element={<Group/>}/>
                    <Route path={':groupId'} element={<Outlet/>}>
                        <Route index element={<GroupDetails/>}/>
                        <Route path={':postId'} element={<PostDetail/>}/>
                        <Route path={'members'} element={<EditMembers/>}/>
                    </Route>
                </Route>
                <Route path={'/chat'} element={<Chat/>}/>
            </Routes>
        </Suspense>
    )
}

export default Routing
