import {FunctionComponent, useContext} from 'react'
import {IMovie} from '../../models/IMovie.ts'
import styled from 'styled-components'
import ViewModeContext from '../../context/viewModeContext.tsx'
import {useNavigate} from 'react-router-dom'

const StyledMovie = styled.div`
 background: #2b2d30;
  color: #aabdc1;
  display: flex;
  margin: .5rem 0;
  width: 100%;
  max-height: 20rem;

  & > div {
    width: 100%;
    margin: .5rem;
  }

  div:first-child {
    width: auto;
    margin: 0;
  }

  img {
    height: 20rem;
    margin-right: .5rem;
  }

  .plot {
    height: 8rem;
    overflow-y: scroll;
    margin: .5rem .25rem .5rem 0;
  }

  .schedule {
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }

  h3 {
    margin-bottom: 0;
  }`

const Movie: FunctionComponent<IMovie> = ({id,poster, title, plot, schedule, actors, writers, directors}) => {
    const {viewMode} = useContext(ViewModeContext)
    const navigate = useNavigate()

    return (
        <StyledMovie>
            <div>
                <img src={poster} alt={`${title} poster`}/>
            </div>
            <div>
                <h3>{title}</h3>
                <div>Actors: {actors.map(x => x.name).join(' | ')}</div>
                <div>Director(s): {directors.map(x => x.name).join(' | ')}</div>
                <div>Writers: {writers.map(x => x.name).join(' | ')}</div>

                <div className="plot">{plot}</div>

                <div className="schedule">
                    {schedule.map(s => <div key={s.time}>{s.time}</div>)}
                </div>

                <div>
                    {viewMode === 'admin' && <button onClick={() => navigate(id)}>edit</button>}
                </div>
            </div>
        </StyledMovie>
    )
}

export default Movie
