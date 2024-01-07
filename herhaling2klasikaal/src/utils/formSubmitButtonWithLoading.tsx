import {FunctionComponent} from 'react'
import {Button, ProgressBar} from 'react-bootstrap'
import styled from 'styled-components'

const StyledProgressBar = styled(ProgressBar)`
  // Ensure that the button has the same height when showing the loading bar.
  height: 1.5rem
`


interface FormSubmitButtonWithLoadingProps {
    loading: boolean
    text: string
    loadingText: string
}

const FormSubmitButtonWithLoading: FunctionComponent<FormSubmitButtonWithLoadingProps> = ({loading, text, loadingText}) => {
    return (
        <div className={'d-grid'}>
            <Button variant="primary" disabled={loading} type="submit">
                {loading ? <StyledProgressBar striped variant="info" now={100} animated label={loadingText}/> : text}
            </Button>
        </div>
    )
}

export default FormSubmitButtonWithLoading
