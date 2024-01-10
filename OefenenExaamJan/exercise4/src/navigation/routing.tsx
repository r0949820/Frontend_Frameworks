import {FunctionComponent} from 'react'
import {Outlet, Route, Routes} from 'react-router-dom'
import Home from '../pages/home/home.tsx'
import DetailPage from '../pages/detail/detailPage.tsx'

interface RoutingProps {

}

const Routing: FunctionComponent<RoutingProps> = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Outlet/>}>
                <Route index element={<Home/>}/>
                <Route path={':id'} element={<DetailPage/>}/>
            </Route>
        </Routes>
    )
}

export default Routing