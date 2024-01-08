import {FunctionComponent} from 'react'
import {Navigate, Outlet, useLocation, useNavigate, useParams} from 'react-router-dom'

interface GameProps {

}

const Game: FunctionComponent<GameProps> = () => {
    const {chosenRegion} = useParams()
    const location = useLocation()
    const navigate = useNavigate()

    if (location.pathname != '/game/region' && !chosenRegion) {
        return <Navigate to={'region'}/>
    }

    const hasChosenRegion = (
        <div>
            You've chosen to practice the capitals in {chosenRegion},
            &nbsp;<a href="#" onClick={() => navigate('/game/region')}>click here</a>&nbsp;
            to choose another region.
        </div>
    )

    const hasNotChosenRegion = (
        <div>
            Please select a region before playing the game.
        </div>
    )

    return (
        <>
            <h1>Play the game!</h1>
            {chosenRegion ? hasChosenRegion : hasNotChosenRegion}

            <Outlet/>
        </>
    )
}

export default Game