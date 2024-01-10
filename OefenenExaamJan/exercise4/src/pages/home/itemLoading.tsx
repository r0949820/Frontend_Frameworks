import {FunctionComponent, useContext} from 'react'
import SettingContext from '../../context/settingContext.tsx'
import {Card, Placeholder} from 'react-bootstrap'


interface ItemLoadingProps {

}

const ItemLoading: FunctionComponent<ItemLoadingProps> = () => {
    const {darkTheme} = useContext(SettingContext)

    return (
        <Card className={`my-2 ${darkTheme ? 'bg-dark text-secondary'  : ''}`}>
            <Card.Body>
                <blockquote className="blockquote mb-0">
                        <Placeholder as={Card.Text} animation="glow">
                            <Placeholder xs={7}/>
                        </Placeholder>
                        <Placeholder as={Card.Text} animation="glow">
                            <Placeholder xs={4}/>
                        </Placeholder>
                </blockquote>
            </Card.Body>
        </Card>
    )
}

export default ItemLoading