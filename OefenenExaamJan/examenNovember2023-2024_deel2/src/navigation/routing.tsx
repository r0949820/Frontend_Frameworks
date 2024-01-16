import {FunctionComponent} from 'react'
import {Outlet, Route, Routes} from 'react-router-dom'
import Surveys from '../pages/surveys.tsx'
import SurveyDetail from '../pages/detail/surveyDetail.tsx'

interface RoutingProps {

}

const Routing: FunctionComponent<RoutingProps> = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Outlet/>}>
                <Route index element={<Surveys/>}/>
                <Route path={':id'} element={<SurveyDetail/>}/>
            </Route>
        </Routes>
    )
}

export default Routing
