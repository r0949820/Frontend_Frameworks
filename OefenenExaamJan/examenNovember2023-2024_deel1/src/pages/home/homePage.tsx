import {FunctionComponent, Suspense, useContext, useEffect, useState} from 'react'
import {useGetAllCinemas} from '../../api/cinemaApi.ts'
import CinemaSelector from './cinemaSelector.tsx'
import ViewModeContext from '../../context/viewModeContext.tsx'
import MovieList from './movieList.tsx'
import LoadingPart from '../../utils/loadingPart.tsx'
import {useCreateMovie} from '../../api/movieApi.ts'

const HomePage: FunctionComponent = () => {
    const {data: cinemas} = useGetAllCinemas()
    const [selectedCinema, setSelectedCinema] = useState<string | null>(null)
    const {mutate: createMovie, isLoading} = useCreateMovie()
    const {viewMode} = useContext(ViewModeContext)

    useEffect(() => {
        if (viewMode != 'admin' && selectedCinema === null && cinemas) {
            setSelectedCinema(cinemas[0]?.id)
        }
    }, [cinemas, selectedCinema, viewMode])


    return (
        <>
            <div className="cinema-selector">
                {viewMode === 'admin' && <CinemaSelector location={'All'}
                                                         selectCinema={() => setSelectedCinema(null)}
                                                         selected={selectedCinema === null}/>}

                {cinemas?.map(c => (
                    <CinemaSelector {...c} key={c.id} selected={c.id === selectedCinema}
                                    selectCinema={() => setSelectedCinema(c.id)}/>
                ))}
            </div>
            {viewMode === 'admin' && (
                <button onClick={() => createMovie()} disabled={isLoading}>
                    + Add movie
                    {isLoading && <LoadingPart/>}
                </button>
            )}

            <div className="movie-list">
                <Suspense fallback={<LoadingPart/>}>
                <MovieList cinemaId={selectedCinema}/>
                </Suspense>
            </div>
        </>
    )
}

export default HomePage
