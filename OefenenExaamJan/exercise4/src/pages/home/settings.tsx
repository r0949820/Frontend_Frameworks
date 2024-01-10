import {FunctionComponent, useContext} from 'react'
import {Form} from 'react-bootstrap'
import SettingContext from '../../context/settingContext.tsx'

interface SettingsProps {

}

const Settings: FunctionComponent<SettingsProps> = () => {
    const {darkTheme, toggleDarkTheme, setRefetchInterval, refetchInterval} = useContext(SettingContext)

    return (
        <>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Refetch interval</Form.Label>
                    <Form.Control type="number" value={refetchInterval} onChange={evt => setRefetchInterval(Number(evt.currentTarget.value))}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Check
                        type="switch"
                        label="Use dark theme"
                        checked={darkTheme} onChange={toggleDarkTheme}
                    />
                </Form.Group>
            </Form>
        </>
    )
}

export default Settings