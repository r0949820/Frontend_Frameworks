import {FunctionComponent} from 'react'
import {Outlet, Route, Routes} from 'react-router-dom'
import SearchPage from '../pages/searchPage/searchPage.tsx'
import UnderConstruction from '../pages/searchPage/underConstruction/underConstruction.tsx'
import DetailPage from '../pages/searchPage/detail/detailPage.tsx'

interface RoutingProps {

}

const Routing: FunctionComponent<RoutingProps> = () => {
    return (
        <Routes>
            <Route path={'/'} element={<SearchPage/>}/>

            <Route path={'/laptops'} element={<Outlet/>}>
                <Route index element={<SearchPage/>}/>
                <Route path={':id'} element={<DetailPage/>}/>
            </Route>
            <Route path={'*'} element={<UnderConstruction/>}/>
        </Routes>
    )
}

export default Routing