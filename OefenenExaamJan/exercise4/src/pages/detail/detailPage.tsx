import {FunctionComponent} from 'react'
import {Navigate, useNavigate, useParams} from 'react-router-dom'
import {useGetItem} from '../../api/hackerNewsAPI.ts'
import Comment from './comment.tsx'




interface DetailPageProps {

}

const DetailPage: FunctionComponent<DetailPageProps> = () => {
    const {id} = useParams()
    const {data: item} = useGetItem(Number(id))
    const navigate = useNavigate()
    const prevBtn = <span className="me-2" onClick={() => navigate(-1)}>&lt;--</span>

    if (!item) {
        return <Navigate to={'/'}/>
    }

    return (
        <>
            <h1>
                {prevBtn}
                {item.url ? <a href={item.url}>{item.title}</a> : item.title}
            </h1>

            <div dangerouslySetInnerHTML={{__html: item?.text ?? ''}}/>

            {item.kids?.map(k => <Comment id={k} key={k}/>)}
        </>
    )
}

export default DetailPage