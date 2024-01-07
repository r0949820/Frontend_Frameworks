import {FunctionComponent} from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from '../pages/home/home.tsx'
import Game from '../pages/game/game.tsx'
import ChooseRegion from '../pages/game/chooseRegion/chooseRegion.tsx'
import Play from '../pages/game/play/play.tsx'
import Highscores from '../pages/highscores/highscores.tsx'

interface RoutingProps {

}

const Routing: FunctionComponent<RoutingProps> = () => {
    return (
        <Routes>
            <Route index element={<Home/>}/>
            <Route path={'/game'} element={<Game/>}>
                <Route path={'region'} element={<ChooseRegion/>}/>
                <Route path={'play/:chosenRegion'} element={<Play/>}/>
            </Route>
            <Route path={'/highscores'} element={<Highscores/>}/>
            <Route path={'/highscores/:chosenRegion'} element={<Highscores/>}/>
        </Routes>
    )
}

export default Routing