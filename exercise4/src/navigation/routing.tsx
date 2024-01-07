import {FunctionComponent} from 'react'
import {Outlet, Route, Routes} from 'react-router-dom'
import Home from '../pages/home.tsx'

interface RoutingProps {

}

const Routing: FunctionComponent<RoutingProps> = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Outlet/>}>
                <Route index element={<Home/>}></Route>
                <Route path={':itemId'} ></Route>
            </Route>
        </Routes>
    )
}

export default Routing