import {FunctionComponent, useContext} from 'react'
import {Navigate, useParams} from 'react-router-dom'
import {useGetMovieById} from '../../../api/movieApi.ts'
import EditMovie from './editMovie.tsx'
import ViewModeContext from '../../../context/viewModeContext.tsx'

const DetailPage: FunctionComponent = () => {
    const {id} = useParams()
    const {data: movie} = useGetMovieById(id!)
    const {viewMode} = useContext(ViewModeContext)

    if (!movie || viewMode === 'user') return <Navigate to={'/'} />
    
    return (
        <>
            <EditMovie {...movie}/>
        </>
    )
}

export default DetailPage
