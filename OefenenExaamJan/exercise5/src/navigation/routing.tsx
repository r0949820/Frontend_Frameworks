import {FunctionComponent, Suspense} from 'react'
import {Outlet, Route, Routes} from 'react-router-dom'
import Home from '../pages/home/home.tsx'
import Login from '../pages/login/login.tsx'
import ToDoLists from '../pages/lists/toDoLists.tsx'
import ToDoListDetail from '../pages/lists/detail/toDoListDetail.tsx'
import LoadingPage from '../utils/loadingPage.tsx'

interface RoutingProps {

}

const Routing: FunctionComponent<RoutingProps> = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path={'/login'} element={<Login/>}/>
            <Route path={'/lists'} element={<Suspense fallback={<LoadingPage/>}><Outlet/></Suspense>}>
                <Route index element={<ToDoLists/>}/>
                <Route path={':listId'} element={<ToDoListDetail/>}/>
            </Route>
        </Routes>
    )
}

export default Routing