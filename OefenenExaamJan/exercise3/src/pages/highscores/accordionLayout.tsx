import {FunctionComponent, MouseEvent} from 'react'
import {Accordion} from 'react-bootstrap'
import {getAllRegions} from '../../api/capitalsAPI.ts'
import HighscoreList from './highscoreList.tsx'

interface AccordionLayoutProps {
    region?: string
    setRegion: (newRegion: string) => void
}

const AccordionLayout: FunctionComponent<AccordionLayoutProps> = ({region, setRegion}) => {
    const selectAccordionItem = (evt: MouseEvent<HTMLElement>, region: string): void => {
        if (evt.target instanceof HTMLElement) {
            evt.target.blur()
        }
        setRegion(region)
    }


    return (
        <>
            <Accordion activeKey={region}>
                {getAllRegions().map(r => (
                    <Accordion.Item eventKey={r} key={r} onClick={evt => selectAccordionItem(evt, r)}>
                        <Accordion.Header>{r}</Accordion.Header>
                        <Accordion.Body>
                            <HighscoreList region={region}/>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}

            </Accordion>
        </>
    )
}

export default AccordionLayout