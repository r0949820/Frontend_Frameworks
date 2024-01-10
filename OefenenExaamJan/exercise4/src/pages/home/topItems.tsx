import {FunctionComponent, Suspense, useState} from 'react'
import {useGetItemIds} from '../../api/hackerNewsAPI.ts'
import {EndpointType} from '../../models/IEndpoint.ts'
import Item from './item.tsx'
import ItemLoading from './itemLoading.tsx'
import {Button} from 'react-bootstrap'


interface TopItemsProps {
    endpoint: EndpointType
}

const TopItems: FunctionComponent<TopItemsProps> = ({endpoint}) => {
    const {data: topStories} = useGetItemIds(endpoint)
    const [loadingEnd, setLoadingEnd] = useState(10)

    return (
        <>

            {/* Al ingeladen in een vorige load */}
            {topStories?.slice(0, Math. max(10, loadingEnd - 10)).map(s => <Item key={s} id={s}/>)}


            {/* Nieuwe data */}
            <Suspense fallback={<ItemLoading/>}>
                {loadingEnd > 10 && topStories?.slice(loadingEnd - 10, loadingEnd).map(s => <Item id={s} key={s}/>)}
            </Suspense>

            {topStories && loadingEnd < topStories?.length && (
                <Button variant="link" onClick={() => setLoadingEnd(x => x + 10)}>Load more ...</Button>
                )}
        </>
    )
}

export default TopItems