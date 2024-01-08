import {FunctionComponent, useState} from 'react'
import AccordionLayout from './accordionLayout.tsx'
import ColumnLayout from './columnLayout.tsx'
import {useParams} from 'react-router-dom'


interface HighscoresProps {

}

const Highscores: FunctionComponent<HighscoresProps> = () => {
    const {chosenRegion} = useParams()
    const [region, setRegion] = useState<string | undefined>(chosenRegion)

    return (
        <>
            <div className="d-md-none">
                <AccordionLayout region={region} setRegion={setRegion}/>
            </div>
            <div className="d-none d-md-block">
                <ColumnLayout region={region} setRegion={setRegion}/>
            </div>
        </>
    )
}

export default Highscores