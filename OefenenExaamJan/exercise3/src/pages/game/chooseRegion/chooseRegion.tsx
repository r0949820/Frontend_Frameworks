import {FunctionComponent} from 'react'
import {ListGroup} from 'react-bootstrap'
import {getAllRegions} from '../../../api/capitalsAPI.ts'
import {useNavigate} from 'react-router-dom'

interface ChooseRegionProps {

}

const ChooseRegion: FunctionComponent<ChooseRegionProps> = () => {
    const navigate = useNavigate()

    return (
        <>
            <ListGroup className="mt-3">
                {getAllRegions().map(r => (
                    <ListGroup.Item key={r} action onClick={() => navigate(`/game/play/${r}`)}>
                        {r}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </>
    )
}

export default ChooseRegion